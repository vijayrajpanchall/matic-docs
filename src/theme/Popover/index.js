import * as React from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Tooltip from 'react-bootstrap/Tooltip';

export default function Glossary ({type, text, definition}) {
    if (type == 'popover') {
        const popover = (
            <Popover>
            <Popover.Header as="h3">💡 {text}</Popover.Header>
            <Popover.Body>
                {definition}
            </Popover.Body>
            </Popover>
        );

        return (
            <OverlayTrigger trigger="hover" placement="auto-start" overlay={popover}>
            <span className="popover-block">
                <p disabled style={{ pointerEvents: 'none', margin: '0px' }}>
                    {text}
                </p>
            </span>
            </OverlayTrigger>
        );
    }

    else {
        const tooltip = (
            <Tooltip>
              {definition}
            </Tooltip>
        );

        return (
            <OverlayTrigger trigger="hover" placement="top" overlay={tooltip}>
                <span className="popover-block">
                    <p disabled style={{ pointerEvents: 'none' }}>
                    {text}
                    </p>
                </span>
            </OverlayTrigger>
        );
    }
};


/* Uses
-> Import the module on pages you want to include the Popover/Tooltip:
import Glossary from "@theme/Popover";

-> Use the modules as follows:
<Glossary type="tooltip/popover" text="Some text" definition="Here is the definition."/>

-> Note:
If the type is not predefined, the glossary element will throw a tooltip by default.
Also, the Glossary element should not be called at the beginning or ending of a paragraph. It'll break some of the markdown fx.
*/
