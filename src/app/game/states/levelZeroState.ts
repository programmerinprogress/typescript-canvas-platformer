import {AbstractState} from './abstractState';
import {StateSystem} from "./stateSystem";
import {MainMenuState} from "./mainMenuState";

export class LevelZeroState implements AbstractState{

  id:string;
  stateManager:StateSystem;

  constructor(stateManager:StateSystem){
    this.id = 'STATE_LEVEL_0';
    this.stateManager = stateManager;
    this.init();
  }

  public receiveMessages = (messages:Object):void => {
    // the state gets to decide how to process the messages, maybe it could be used to
    // update scores and other visuals
  };

  public init = ():void => {
    console.log('initiating state: ' + this.id);
  };

  public enter = ():void  => {
    console.log('entering state: ' + this.id);

    // enable event listeners
    window.addEventListener('keypress', this.handleKeypress);

  };

  private handleKeypress = (event) => {
    let keys = {
      'KEY_Q': 113
    };

    if (event.which == keys.KEY_Q) {
      this.stateManager.addState(new MainMenuState(this.stateManager));
      this.stateManager.transitionTo('STATE_MAIN_MENU', true, {})
    }
  };

  public update = (dt:number):void => {
  };

  public render = (dt:number, canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D):void => {
    ctx.fillStyle = 'blue';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.font = "60px arial";
    ctx.fillText("Level Zero", 260,240,720);
  };

  public exit = ():void  =>{
    console.log('exiting state: ' + this.id);

    // example usage, disabling any input listeners that this state uses
    window.removeEventListener('keypress', this.handleKeypress);
  };

  public destroy = ():void => {
    console.log('destroying state: ' + this.id);
  };
}
