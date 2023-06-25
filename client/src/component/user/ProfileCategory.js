import { styled } from "styled-components";

const CartegoryContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 30px;
    color: var(--white);
    border-radius: 20px;
    background-color: var(--orange);
    margin-top: 50px;
`
export default function ProfileCartegory({text}) {
    return(
        <CartegoryContainer>
            {text}
        </CartegoryContainer>
    )
}
