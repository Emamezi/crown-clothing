import styled from "styled-components";

// .checkout-item-container {
//   display: flex;
//   width: 100%;
//   min-height: 90px;
//   border-bottom: 1px solid darkgray;
//   padding: 15px 0;
//   font-size: 20px;
//   align-items: center;

//   .image-container {
//     width: 23%;
//     padding-right: 30px;
//     img {
//       width: 100%;
//       height: 100%;
//     }
//   }
//   .name,
//   .quantity,
//   .price {
//     width: 23%;
//   }
//   .quantity {
//     display: flex;

//     .arrow {
//       cursor: pointer;
//     }
//     .value {
//       margin: 0 10px;
//     }
//   }
//   .remove-button {
//     padding-left: 12px;
//     cursor: pointer;
//   }
// }
export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 30px;
`;

export const CheckoutItemContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 90px;
  border-bottom: 1px solid darkgray;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;

  ${ImageContainer} {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .name,
  .quantity,
  .price {
    width: 23%;
  }
  .quantity {
    display: flex;

    .arrow {
      cursor: pointer;
    }
    .value {
      margin: 0 10px;
    }
  }
  .remove-button {
    padding-left: 12px;
    cursor: pointer;
  }
`;
