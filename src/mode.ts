import {HELP_ELEMENT_ID} from "./action/help";

export type EditMode = 'NORMAL' | 'INSERT' | 'TASK_DETAIL' | 'PROJECT_SORT' | 'HELP' | 'WAITING'

let _current_mode: EditMode = 'NORMAL'

export function determine_mode(new_active: HTMLElement | null): EditMode {
    if (new_active) {
        if (new_active.contentEditable === 'true') return 'INSERT'
        if (['TEXTAREA', 'INPUT'].includes(new_active.tagName)) return 'INSERT'
    }
    if (document.getElementsByClassName('Menu Menu--select').length > 0) {
        return 'PROJECT_SORT'
    } else if (document.getElementById(HELP_ELEMENT_ID)) {
        return 'HELP'
    } else if (document.getElementsByClassName('SingleTaskPaneSpreadsheet').length > 0) {
        return 'TASK_DETAIL'
    }
    return 'NORMAL'
}

export function update_mode(new_active: Element | null): void {
    let new_mode = determine_mode(new_active as HTMLElement)
    if (new_mode !== _current_mode) {
        _current_mode = new_mode
        console.log('Updated mode to', new_mode)
    }
}

export function current_mode(): EditMode {
    return _current_mode
}