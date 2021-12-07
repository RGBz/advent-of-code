export interface ForwardCommand {
  type: "forward";
  amount: number;
}

export interface DownCommand {
  type: "down";
  amount: number;
}

export interface UpCommand {
  type: "up";
  amount: number;
}

export type SubmarineCommand = ForwardCommand | DownCommand | UpCommand;
