var quill = new Quill('#editor-container', {
    modules: {
        formula: true,
        syntax: true,
        toolbar: '#toolbar-container'
    },
    placeholder: 'Start Wrting your epic article.....',
    theme: 'snow'
});
