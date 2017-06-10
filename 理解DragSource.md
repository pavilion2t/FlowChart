  # DragSource 

Wrap your component with DragSource to make it draggable. DragSource is a higher-order component accepting three required parameters. They are described in detail below.

To use DragSource, don't forget to wrap the top-level component of your app in a DragDropContext.

  ## Signature 

DragSource uses partial application.
After specifying its parameters with the first call, you need to pass your React component class as the only parameter in the second call.
This signature makes DragSource usable as an ES7 decorator. 
Read the overview for a more detailed explanation of the decorators and the higher-order components.
