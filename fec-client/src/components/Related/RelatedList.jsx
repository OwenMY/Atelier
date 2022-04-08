import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import Card from './Card.jsx'

const Container = styled.div`
overflow : hidden;
width : 100%;
position: relative
`;
const SliderContainer = styled.div`
  // display: flex;
  // flex-direction: row;
  // justify-content : space-between;
  // min-width: 0;
  // // flex: 1;
  // margin: 10px;
  position: relative;
  top: 64px;
  left: 63px;
}

`;

const ProductCard = styled.div`
width : 100%;
display : flex;
flex-direction: row;
`;

const Button = styled.button`
  display : none;



  ${Container}:hover & {
    display : flex;
    flex-direction: column;
    position : relative;
    all: unset;
    display : block;
    border: 1px solid coral;
    color: coral;
    border-radius: 10px;
    position: relative;
    z-index ; 20;
    padding-left: 10px;
    padding-right: 10px;

    &:hover {
      transition: all 0.3s ease-in-out;
      background-color: coral;
      color: #fff;
    }

  }

`;



const TOTAL_SLIDES = 2;
const postsPerPage = 5;

const RelatedList = ({relatedArray})=> {
  const [currentSlide, setCurrentSlide] = useState(0);
  //const [idArray, setIdArray] = useState(null);
  const slideRef = useRef(null);

  const [infoArray, setInfoArray] = useState('');

  const customAxiosFunctions = async () => {

    const promises1 = relatedArray.map((id) => {
      // return axios.get('/api', {headers: {path: `/products/${id}`}});
      return  axios.all([
        axios.get('/api', {headers: {path: `/products/${id}`}}),
        // axios.get('/api', {headers: {path: `/products/${id}/styles`}})
      ])
      .then(axios.spread((data1) => {
        // output of req.

        //console.log('data1', data1, 'data2', data2)
        return data1.data;
      }));

    });
    // const promises2 = relatedArray.map((id) => {
    //   return axios.get('/api', {headers: {path: `/products/${id}/styles`}});
    // });

    const resolvedResponses1 = await Promise.all(promises1);

    resolvedResponses1.map((el) => {
      //console.log(el)
      setInfoArray(oldArray => [...oldArray, el]);
    });

  };


  const nextSlide = () => {
        setCurrentSlide(currentSlide + 1)
    };

  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    slideRef.current.animate( { opacity: [0, 1]},   500 );
    // slideRef.current.style.transform = `translateX(-${currentSlide}03%)`;
    //setIdArray(infoArray.slice(currentSlide * postsPerPage , postsPerPage * (currentSlide + 1)));
  }, [currentSlide]);

  useEffect(() => {
    //setInfoArray('');
    customAxiosFunctions();
  }, [relatedArray]);

  // useEffect(() => {
  //   if(relatedArray.length !== 0){
  //     // setIdArray(relatedArray.slice(currentSlide * postsPerPage , postsPerPage * (currentSlide + 1)));
  //     setIdArray(relatedArray.slice(0));
  //   }

  // }, [relatedArray]);

    return (
      <Container>
        <SliderContainer ref={slideRef} >
        <ProductCard>
        <Button onClick={prevSlide}>←</Button>
      {infoArray instanceof Array && infoArray.slice(currentSlide * postsPerPage , postsPerPage * (currentSlide + 1)).map((data,index)=>(
        <Card productInfo={data} key={index}/>
      ))}
      <Button onClick={nextSlide}>→</Button>
      </ProductCard>
        </SliderContainer>

        </Container>
    );

    //


}


  //check info value
  // useEffect(() => {
  //   console.log('pro',productInfo)
  //   console.log('sty',styleInfo)
  // }, [productInfo,styleInfo])


  // "https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"


export default RelatedList;