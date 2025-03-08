import {Task} from '@lit/task';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { GLOBAL_EVENT_NAMESPACE } from '../globals';

interface YesNoResponse {
    "answer": string,
    "forced": boolean,
    "image": string
}

@customElement('yes-no')
class YesNoElement extends LitElement {

    static styles = css`
        p {
            min-width: 25px;
        }
    `

    private _productTask = new Task(this, {
            task: async () => {
                const response = await fetch(`https://yesno.wtf/api`);
                if (!response.ok) { throw new Error(); }
                return response.json() as unknown as YesNoResponse;
            }, 
            autoRun: false, // only run when the logo is clicked (avoid unnecessary API calls)
            args: () => []
        });

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener(GLOBAL_EVENT_NAMESPACE, this._handleGlobalEvents);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        window.removeEventListener(GLOBAL_EVENT_NAMESPACE, this._handleGlobalEvents);
    }

    _handleGlobalEvents = (e: Event) => {
        const customEvent = e as CustomEvent;
        if (customEvent.detail?.type === 'clickedLogo') {
            this._productTask.run();
        }
        };

    render() {
        return this._productTask.render({
        pending: () => html`<p>...</p>`,
        complete: (yesNoResponse) => html`
            <p>${yesNoResponse.answer}</p>
            `,
        error: (e) => html`<p>Error: ${e}</p>`
        });
    }
}

