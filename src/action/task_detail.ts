import {update_mode} from "../mode";


export function focus_comments(e: KeyboardEvent) {
    e.preventDefault();
    let el = document.getElementsByClassName('ProsemirrorEditor')[1] as HTMLElement
    el.focus()
    // put focus on the end of any existing content instead of at the start (which is what happens by default.)
    let sel = window.getSelection()!
    let range = document.createRange()
    range.selectNodeContents(el)
    sel.removeAllRanges()
    sel.addRange(range)
    document.getSelection()!.collapseToEnd()
}


export function focus_description(e: KeyboardEvent) {
    e.preventDefault();
    let el = document.getElementsByClassName('ProsemirrorEditor')[0] as HTMLElement
    el.focus()
    // put focus on the end of any existing content instead of at the start (which is what happens by default.)
    let sel = window.getSelection()!
    let range = document.createRange()
    range.selectNodeContents(el)
    sel.removeAllRanges()
    sel.addRange(range)
    document.getSelection()!.collapseToEnd()
}

export function close(e: KeyboardEvent) {
    e.preventDefault()
    let el = document.getElementsByClassName('FullWidthPageStructureWithDetailsOverlay-detailsOverlay')[0] as HTMLElement
    el.addEventListener("transitionend", () => {
        console.log('Transition end')
        update_mode(null)
    }, false);
}


export function add_subtask(e: KeyboardEvent) {
    e.preventDefault()
    let el = document.getElementsByClassName('AddSubtaskButton DropTargetAddSubtaskButton-button')[0].children[0] as HTMLElement
    el.click()
}