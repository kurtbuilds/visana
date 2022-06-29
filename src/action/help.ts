import {update_mode} from "../mode";

export const HELP_ELEMENT_ID = 'visana-help-modal'

export function show_help() {
    let help_el = document.createElement('div')
    help_el.style.cssText = 'position: fixed; top: 0; bottom: 0; left: 0; right: 0; background: white; color: black;'
    help_el.innerHTML = `
<h1>Visana Shortcuts</h1>
Press &lt;Esc&gt; to hide.

<h2>Normal mode</h2>
<p>Normal mode is the default mode.</p>

<p><strong>?</strong>&nbsp;-&nbsp;Open this help menu.</p>
<p><strong>j</strong>&nbsp;-&nbsp;Down one line.</p>
<p><strong>k</strong>&nbsp;-&nbsp;Up one line.</p>
<p><strong>g h</strong>&nbsp;-&nbsp;Go to Home.</p>
<p><strong>g t</strong>&nbsp;-&nbsp;Go to My Tasks.</p>
<p><strong>g i</strong>&nbsp;-&nbsp;Go to My Inbox.</p>
<p><strong>g g</strong>&nbsp;-&nbsp;Go to Goals.</p>
<p><strong>g {1-5}</strong>&nbsp;-&nbsp;Go to one of your first 5 projects.</p>
<p><strong>Tab</strong>&nbsp;-&nbsp;Open task detail pane.</p>
<p><strong>o</strong>&nbsp;-&nbsp;Open task detail pane.</p>
<p><strong>x</strong> - Mark task complete.</p>

<h2>Insert Mode</h2>
<p>Insert mode is when you are editing text.</p>
<p>No current keyboard shortcuts.</p>

<h2>Task Detail Mode</h2>
<p>Task Detail Mode is the task detail pane is open.</p>
<p><strong>a</strong> - Add a subtask</p>
<p><strong>c</strong> - Insert a comment.</p>
<p><strong>d</strong>&nbsp;-&nbsp;Edit the description.</p>
<p><strong>Esc</strong>&nbsp;-&nbsp;Close the task detail pane.</p>
`
    help_el.id = HELP_ELEMENT_ID
    document.body.appendChild(help_el)
    document.body.style.position = 'relative'
    update_mode(null)
}

export function hide_help() {
    document.getElementById(HELP_ELEMENT_ID)!.remove()
    document.body.style.position = ''
    update_mode(null)
}