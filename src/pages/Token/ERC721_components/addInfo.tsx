import nft1 from "../../../assets/nft1.png"
import nft2 from "../../../assets/nft2.png"
import nft3 from "../../../assets/nft3.png"
import nft4 from "../../../assets/nft4.png"

export const leftAnimation = {
  hidden:{
    x: 100,
    opacity: 0,
  },
  visible: {
    x: 100,
    opacity: 1,
    transition: {duration: 3, delay: 1},
}}

export const rightAnimation = {
  hidden:{
    x: 470,
    opacity: 0,
  },
  visible: {
    x: 470,
    opacity: 1,
    transition: {duration: 3, delay: 1}
  },
}
export const upAnimation = {
  hidden:{
    scale: 0,
    opacity: 0,
    y: -1000,
  },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {duration: 2}
  },
}

export const downAnimation = {
  hidden:{
    scale: 0,
    opacity: 0,
    y: 1000,
  },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {duration: 2}
  },
}
export const faq = {
  visible: custom => ({ opacity: 1, scale: 1, transition: { duration: 1.5, delay: 1.5 * custom, ease: [0, 0.71, 0.2, 1.01] } }),
  hidden: { opacity: 0, scale: 0.5 }
};

export const img = [{
    title: 'Chinese',
    src: nft1,
    custom: 4, 
  },
  {
    title: 'English',
    src: nft2,
    custom: 2, 
  },
  {
    title: 'Arab',
    src: nft3,
    custom: 3, 
  },
  {
    title: 'Russian',
    src: nft4,
    custom: 4, 
  },
  ]
  