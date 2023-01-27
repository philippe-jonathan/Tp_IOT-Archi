import { UserController } from "./../mysql/UserController";
import { DeviceController } from "./../mysql/DeviceController";
import { BuildingController } from "../mysql/BuildingController";
import { RoomController } from "./../mysql/RoomController";
import { CaptorController } from "./../mysql/CaptorController";

import { StateMachine } from "@edium/fsm";
import { Controller } from "../mysql/Controller";

export class FSM {
    context: string[];
    controllers: Controller[];
    constructor(context) {
      console.log(`FSM : constructor : context str = ${context}`);
      if(typeof context === 'string' || context instanceof String)
        this.context = context.split('//');
      console.log(`FSM : constructor : context = ${this.context}`);
      this.controllers = [new UserController(), new DeviceController(), new BuildingController(), new RoomController(), new CaptorController()]
    };


    exitAction = ( state, context ) => {
        // Returning false will cancel the state transition
        //console.log("FSM : exit action");
        return true;
    };
      
    directionAction ( state, context ) {
        const currentMessage = context.shift();
        console.log(`FSM : action = direction, context = {${context}}, message = ${currentMessage}`);
        if ( currentMessage === "tolocal" ) {
            state.trigger( "tolocal" );
        } else if ( currentMessage === "tocloud" ) {
            state.trigger( "tocloud" );
        }
    };

    tableAction ( state, context ) {
        const currentMessage = context.shift();
        console.log(`FSM : action = table, context = {${context}}, message = ${currentMessage}`);
        switch (currentMessage) {
            case "users": state.trigger( "users" ); break;
            case "devices": state.trigger( "devices" ); break;
            case "buildings": state.trigger( "buildings" ); break;
            case "rooms": state.trigger( "rooms" ); break;
            case "captors": state.trigger( "captors" ); break;
            default: break;
        }
    };
    
    statementAction ( state, context ) {
        const currentMessage = context.shift();
        console.log(`FSM : action = statement, context = {${context}}, message = ${currentMessage}`);
        if ( currentMessage === "get" ) {
            state.trigger( "get" );
        } else if ( currentMessage === "insert" ) {
            state.trigger( "insert" );
        } else if ( currentMessage === "update" ) {
            state.trigger( "update" );
        } else if ( currentMessage === "delete" ) {
            state.trigger( "delete" );
        }
    };
    
    parseDataAction ( state, context ) {
        const data = context.shift();
        console.log(`FSM : action = parse, context = {${context}}, data = {${data}}`);
        //if(data is ok)
        state.trigger( "parse" );
    };
    
    applyAction ( state, context ) {
        console.log(`FSM : action = apply, context = {${context}}`);
        const currentMessage = context.shift();
        if(currentMessage === "apply")
        {
            state.trigger( "apply" );
        }
    };
    
    finalAction ( state ) {
        // Can perform some final actions, the state machine is finished running.
        //perform mysql request and/or send message to local
        console.log(`FSM : final action`);
    };
      
    startFsm() {
        console.log(`FSM : startFsm : context = ${this.context}`);
        const stateMachine = new StateMachine('StateMachine', this.context);
        
        const directionState = stateMachine.createState( "Direction state", false, this.directionAction, this.exitAction); // Trivial use of exit action as an example.
        
        const toLocalState = stateMachine.createState( "To local state", false, this.tableAction);
        const toCloudState = stateMachine.createState( "To cloud state", false, this.tableAction);

        const usersState = stateMachine.createState( "Users state", false, this.statementAction);
        const devicesState = stateMachine.createState( "Devices state", false, this.statementAction);
        const buildingsState = stateMachine.createState( "Buildings state", false, this.statementAction);
        const roomsState = stateMachine.createState( "Rooms state", false, this.statementAction);
        const captorsState = stateMachine.createState( "Captors state", false, this.statementAction);
        
        const getState = stateMachine.createState( "Get state", false, this.parseDataAction);
        const insertState = stateMachine.createState( "Insert state", false, this.parseDataAction);
        const updateState = stateMachine.createState( "Update state", false, this.parseDataAction);
        const deleteState = stateMachine.createState( "Delete state", false, this.parseDataAction);
        
        const parseDataState = stateMachine.createState( "Parse data state", false, this.applyAction);
        
        // Notice true indicates completed state.const parseDataState = stateMachine.createState( "Parse data state", false, entryAction);
        const applyState = stateMachine.createState( "Apply state", true, this.finalAction);
        
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
        
        //FIND STATEMENT
        usersState.addTransition( "get", getState );
        usersState.addTransition( "insert", insertState );
        usersState.addTransition( "update", updateState );
        usersState.addTransition( "delete", deleteState );
        
        devicesState.addTransition( "get", getState );
        devicesState.addTransition( "insert", insertState );
        devicesState.addTransition( "update", updateState );
        devicesState.addTransition( "delete", deleteState );
        
        buildingsState.addTransition( "get", getState );
        buildingsState.addTransition( "insert", insertState );
        buildingsState.addTransition( "update", updateState );
        buildingsState.addTransition( "delete", deleteState );
        
        roomsState.addTransition( "get", getState );
        roomsState.addTransition( "insert", insertState );
        roomsState.addTransition( "update", updateState );
        roomsState.addTransition( "delete", deleteState );
        
        captorsState.addTransition( "get", getState );
        captorsState.addTransition( "insert", insertState );
        captorsState.addTransition( "update", updateState );
        captorsState.addTransition( "delete", deleteState );

        //PARSE DATA
        getState.addTransition( "parse", parseDataState );
        insertState.addTransition( "parse", parseDataState );
        updateState.addTransition( "parse", parseDataState );
        deleteState.addTransition( "parse", parseDataState );
        
        //SEND
        parseDataState.addTransition( "apply", applyState );
        
        // Start the state machine
        stateMachine.start( directionState );
        
    
    }
}