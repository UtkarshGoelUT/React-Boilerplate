import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => {
    return (
        <Modal isOpen={!!props.selectedOption} onRequestClose={props.isSelected} contentLabel="Selected Option">
            <h3>Selected Option</h3>
            <p>{props.selectedOption}</p>
            <button onClick={props.isSelected}></button>
        </Modal>
    );
}

export default OptionModal;