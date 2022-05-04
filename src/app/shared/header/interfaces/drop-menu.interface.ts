import { EventEmitter } from "@angular/core";

export interface DropMenu{
    closed: EventEmitter<void>;
    visible: boolean;
    anim: boolean;
    message: string;
}