import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import { AutoComplete } from 'primereact/autocomplete'
import { useState } from 'react'

function CustomAutoComplete({value, onChange, allSuggestions}){

    return (
        <AutoComplete 
            suggestions={allSuggestions}
            completeMethod={()=>{}}
            value={value}
            onChange={onChange}
        />
    )
}

export {CustomAutoComplete}