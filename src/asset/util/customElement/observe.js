import { publish } from "../message/publish.js";

export function observe(target) {
  publish('observe', target)
}