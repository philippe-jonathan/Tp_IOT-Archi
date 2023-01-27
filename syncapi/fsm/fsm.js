const { State, StateMachine } = require('@edium/fsm');

const exitAction = ( state, context ) => {
    // Returning false will cancel the state transition
    //console.log("FSM : exit action");
    return true;
};
  
const directionAction = ( state, context ) => {
    const currentMessage = context.shift();
    console.log(`FSM : action = direction, context = {${context}}, message = ${currentMessage}`);
    if ( currentMessage === "tolocal" ) {
        state.trigger( "tolocal" );
    } else if ( currentMessage === "tocloud" ) {
        state.trigger( "tocloud" );
    }
};
const tableAction = ( state, context ) => {
    const currentMessage = context.shift();
    console.log(`FSM : action = table, context = {${context}}, message = ${currentMessage}`);
    switch (currentMessage) {
        case "users":
            state.trigger( "users" );
            break;
        case "devices":
            state.trigger( "devices" );
            break;
        case "buildings":
            state.trigger( "buildings" );
            break;
        case "rooms":
            state.trigger( "rooms" );
            break;
        case "captors":
            state.trigger( "captors" );
            break;
        default:
            break;
    }
};
const statementAction = ( state, context ) => {
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
const parseDataAction = ( state, context ) => {
    const data = context.shift();
    console.log(`FSM : action = parse, context = {${context}}, data = {${data}}`);
    //if(data is ok)
    state.trigger( "parse" );
};
const applyAction = ( state, context ) => {
    console.log(`FSM : action = apply, context = {${context}}`);
    const currentMessage = context.shift();
    if(currentMessage === "apply")
    {
        state.trigger( "apply" );
    }
};
  
const finalAction = ( state ) => {
    // Can perform some final actions, the state machine is finished running.
    //perform mysql request and/or send message to local
    console.log(`FSM : final action`);
};
  
function startFsm(message) {

    console.log(typeof message);
    if (typeof message === 'string' || message instanceof String)
    {
        let context = message.split('//');

        const stateMachine = new StateMachine('StateMachine', context);
        
        const directionState = stateMachine.createState( "Direction state", false, directionAction, exitAction); // Trivial use of exit action as an example.
        
        const toLocalState = stateMachine.createState( "To local state", false, tableAction);
        const toCloudState = stateMachine.createState( "To cloud state", false, tableAction);

        const usersState = stateMachine.createState( "Users state", false, statementAction);
        const devicesState = stateMachine.createState( "Devices state", false, statementAction);
        const buildingsState = stateMachine.createState( "Buildings state", false, statementAction);
        const roomsState = stateMachine.createState( "Rooms state", false, statementAction);
        const captorsState = stateMachine.createState( "Captors state", false, statementAction);
        
        const getState = stateMachine.createState( "Get state", false, parseDataAction);
        const insertState = stateMachine.createState( "Insert state", false, parseDataAction);
        const updateState = stateMachine.createState( "Update state", false, parseDataAction);
        const deleteState = stateMachine.createState( "Delete state", false, parseDataAction);
        
        const parseDataState = stateMachine.createState( "Parse data state", false, applyAction);
        
        // Notice true indicates completed state.const parseDataState = stateMachine.createState( "Parse data state", false, entryAction);
        const applyState = stateMachine.createState( "Apply state", true, finalAction);
        
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
  

module.exports = {
    startFsm: startFsm
  };