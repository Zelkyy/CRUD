import React from "react";
import '../modal/modal.css';
import { api } from "../../../api/api";

const Modal = () => {

    return (
        <div>
            <main>
                <form>
                    <div>
                        <input type="text" />
                        <input type="email" />
                        <input type="text" />
                    </div>

                    <div>
                        <button onClick={() => EditModal(props.id)}>Salvar</button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default Modal