import { UserController } from "../mysql/UserController";
import { DeviceController } from "../mysql/DeviceController";
import { BuildingController } from "../mysql/BuildingController";
import { RoomController } from "../mysql/RoomController";
import { CaptorController } from "../mysql/CaptorController";

import { State, StateMachine } from "@edium/fsm";
import { Controller } from "../mysql/Controller";
import Pool from "mysql2/typings/mysql/lib/Pool";

class Context{
    actions: string[];
    currentController: Controller | undefined;
    data: string | undefined = "";

    users: UserController;
    devices: DeviceController;
    buildings: BuildingController;
    rooms: RoomController;
    captors: CaptorController;

    constructor(actions: string[]) {
        this.actions = actions;
        this.users = new UserController();
        this.devices = new DeviceController();
        this.buildings = new BuildingController();
        this.rooms = new RoomController();
        this.captors = new CaptorController();
        console.log(`Controllers : constructor, users = ${this.users}, devices = ${this.devices}`);
    };
}

export class FSM {
    context: Context;


    constructor(message: string) {
        this.context = new Context(message.split('//'));
        console.log(`FSM : constructor : context = ${this.context}`);
    };


    exitAction = ( state : State, context: string[] ) => {
        // Returning false will cancel the state transition
        //console.log("FSM : exit action");
        return true;
    };
      
    directionAction ( state : State, context: Context ) {
        const currentMessage = context.actions.shift();
        console.log(`FSM : action = direction, context = {${context}}, message = ${currentMessage}`);
        if ( currentMessage === "tolocal" ) {
            state.trigger( "tolocal" );
        } else if ( currentMessage === "tocloud" ) {
            state.trigger( "tocloud" );
        }
    };

    tableAction ( state : State, context: Context ) {
        const currentMessage = context.actions.shift();
        console.log(`FSM : action = table, context = {${context}}, message = ${currentMessage}`);
        switch (currentMessage) {
            case "users": context.currentController = context.users; state.trigger( "users" );break;
            case "devices": context.currentController = context.devices; state.trigger( "devices" ); break;
            case "buildings": context.currentController = context.buildings;  state.trigger( "buildings" ); break;
            case "rooms": context.currentController = context.rooms;  state.trigger( "rooms" ); break;
            case "captors": context.currentController = context.captors;  state.trigger( "captors" ); break;
            default: break;
        }
        console.log(`FSM : action = table, controller = ${context.currentController}`);
    };
    
    parseDataAction ( state : State, context: Context ) {
        context.data = context.actions.shift();
        console.log(`FSM : action = parse, context = {${context}}, data = ${context.data}`);
        //if(data is ok)
        state.trigger( "parse" );
    };
    
    statementAction ( state : State, context: Context ) {
        const currentMessage = context.actions.shift();
        console.log(`FSM : action = statement, context = {${context}}, message = ${currentMessage}`);
        if ( currentMessage === "get" && context.currentController !== undefined) {
            context.currentController.select();
            state.trigger( "get" );
        } else if ( currentMessage === "insert"  && context.currentController !== undefined && context.data !== undefined) {
            context.currentController.insert(context.data);
            state.trigger( "insert" );
        } else if ( currentMessage === "update" && context.currentController !== undefined && context.data !== undefined) {
            context.currentController.update(context.data);
            state.trigger( "update" );
        } else if ( currentMessage === "delete"&& context.currentController !== undefined && context.data !== undefined ) {
            context.currentController?.remove(context.data);
            state.trigger( "delete" );
        }
    };
        
    finalAction ( state : State, context: Context  ) {
        // Can perform some final actions, the state machine is finished running.
        //perform mysql request and/or send message to local
        console.log(`FSM : final action`);
        context.currentController = undefined;
        context.data = undefined;
        
    };
      
    startFsm() {
        console.log(`FSM : startFsm : context = ${this.context}`);
        const stateMachine = new StateMachine('StateMachine', this.context);
        
        const directionState = stateMachine.createState( "Direction state", false, this.directionAction, this.exitAction); // Trivial use of exit action as an example.
        
        const toLocalState = stateMachine.createState( "To local state", false, this.tableAction);
        const toCloudState = stateMachine.createState( "To cloud state", false, this.tableAction);

        const usersState = stateMachine.createState( "Users state", false, this.parseDataAction);
        const devicesState = stateMachine.createState( "Devices state", false, this.parseDataAction);
        const buildingsState = stateMachine.createState( "Buildings state", false, this.parseDataAction);
        const roomsState = stateMachine.createState( "Rooms state", false, this.parseDataAction);
        const captorsState = stateMachine.createState( "Captors state", false, this.parseDataAction);
        
        const parseDataState = stateMachine.createState( "Parse data state", false, this.statementAction);
        
        const getState = stateMachine.createState( "Get state", false, this.finalAction);
        const insertState = stateMachine.createState( "Insert state", false, this.finalAction);
        const updateState = stateMachine.createState( "Update state", false, this.finalAction);
        const deleteState = stateMachine.createState( "Delete state", false, this.finalAction);
        
        
        // TO LOCAL/CLOUD
        directionState.addTransition( "tolocal", toLocalState );
        directionState.addTransition( "tocloud", toCloudState );

        //FIND TABLE
        toLocalState.addTransition( "users", usersState );
        toLocalState.addTransition( "devices", devicesState );
        toLocalState.addTransition( "buildings", buildingsState );
        toLocalState.addTransition( "rooms", roomsState );
        toLocalState.addTransition( "captors", captorsState );

        toCloudState.addTransition( "users", usersState );
        toCloudState.addTransition( "devices", devicesState );
        toCloudState.addTransition( "buildings", buildingsState );
        toCloudState.addTransition( "rooms", roomsState );
        toCloudState.addTransition( "captors", captorsState );
        
        //PARSE DATA
        usersState.addTransition( "parse", parseDataState );
        devicesState.addTransition( "parse", parseDataState );
        buildingsState.addTransition( "parse", parseDataState );
        roomsState.addTransition( "parse", parseDataState );
        captorsState.addTransition( "parse", parseDataState );

        //FIND STATEMENT
        parseDataState.addTransition( "get", getState );
        parseDataState.addTransition( "insert", insertState );
        parseDataState.addTransition( "update", updateState );
        parseDataState.addTransition( "delete", deleteState );
        
        //STATEMENT
        getState.addTransition( "get", getState );
        
        // Start the state machine
        stateMachine.start( directionState );
    }
}