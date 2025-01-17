import styled from "styled-components";

export const ItemDetails = styled.div`
  display: flex;
  width: 70%;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: 10px 20px;
`;

export const CartItemContainer = styled.div`
  display: flex;
  width: 100%;
  row-gap: 20px;
  height: 80px;
  margin-bottom: 15px;

  img {
    width: 30%;
    // object-fit: scale-down;
  }

  ${ItemDetails} {
    .name {
      font-size: 16px;
    }
  }
`;
