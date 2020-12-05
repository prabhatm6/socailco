import React from 'react';
import styled from 'styled-components';

const Modal = styled.div`
    position: absolute;
    top:0;
    left:0;
    height:100vh;
    width:100%;
    background-color:rgba(0,0,0,0.3);
`

const UserModal = () => {
    return (
        <Modal>
            user
        </Modal>
    )
}

export default UserModal
