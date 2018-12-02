import React from "react";
import AccessibleForward from '@material-ui/icons/AccessibleForward'

export default function ErrorPage(props){
    return(
        <div>
            <div>
                <AccessibleForward style={{ color: `#3f51b5`, margin: `15% 0 0 46%`, transform: `scale(15)` }} />
            </div>
            <div>
                <p style={{ color: `#3f51b5`, margin: `15% 0 0 30%`, fontSize: `3em` }}> Oops...Page does not exist</p>
            </div>
        </div>
    )
}