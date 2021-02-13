# Visana

**Manage tasks with Vim-like keyboard shortcuts for Asana**

> **WARNING**: This is alpha quality software. 
> It works great for me, but it might do anything up to and including deleting every task.
> (I've never lost data using this, I'm just being clear the bar is very low.)
> Use at your own risk. If you do use it, I appreciate bug reports, shortcut suggestions,
> or feature suggestions, or other UI/UX improvements.

I got tired of using the mouse with Asana, so I built Vim-like keybindings.

If you use Vimium, you must create an exclude rule for the Asana app in order to use Visana.

Note in this demo the mouse doesn't move at all.

![Visana demo](https://raw.githubusercontent.com/kespindler/visana/master/demo.gif)

# Installation

Go to the Chrome Web Store.

# Shortcuts

### Edit commands

`m` Assign currently selected task to me

`t` Set due date for currently selected task to today

### Focus movement

`j` Move down one line

`k` Move up one line

`J` Modify selection moving down one line

`K` Modify selection moving up one line

`d` Focus on the due date field

`a` Focus on the asignee field

`Tab` Open the detail pane

`Enter` Edit the task name

`c` Focus on the comment field. (Detail pane must be open)

### Page movement

`g i` Go to inbox (notifications)

`g h` Go to home screen

`g t` Go to my tasks

`g p` Go to portfolio

`g g` Go to goals

`g {1-5}` Depending on number, Go to any of the first through fifth project
