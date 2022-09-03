import { SceneContext, SceneSessionData } from "telegraf/typings/scenes";

export interface MySceneSession extends SceneSessionData {
  subscribersIds: number[];
}

export interface BotContext extends SceneContext<MySceneSession> {}
