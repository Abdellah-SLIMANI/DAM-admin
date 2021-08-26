import { SimpleCard } from 'app/components'
import React from 'react'
import JoditEditor from "jodit-react";

export default function TxtModify({value,setValue,content,changedValue}) {
    const config = {
		readonly: false, // all options from https://xdsoft.net/jodit/doc/
        language: "fr",
        resizer: {
            "showSize": true,
            "hideSizeTimeout": 0,
            "min_width": 10,
            "min_height": 10
        },
        useSplitMode: true,
        autofocus: true,
        width: '100%',
        "buttons": "source,bold,italic,underline,strikethrough,eraser,superscript,subscript,ul,ol,indent,outdent,left,font,fontsize,paragraph,classSpan"
	}

    return (
        <div style={{ width: '100%'}}>
            <SimpleCard className='p-5' style={{width: '100%'}}>
                <JoditEditor
                    value={value} 
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => setValue(newContent)} // preferred to use only this option to update the content for performance reasons
                />
            </SimpleCard>
    </div>
    )
}
