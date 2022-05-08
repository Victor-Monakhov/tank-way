import { EventEmitter } from "@angular/core";
import {BehaviorSubject} from "rxjs";

export interface IDropModal {
    closed: EventEmitter<void>;
    visible: boolean;
    anim: boolean;
    message: BehaviorSubject<string>;
}
