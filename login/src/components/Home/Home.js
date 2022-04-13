import * as React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './Home.css';
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header/Header';
import SpinLoading from '../SpinLoading/SpinLoading';
import Category from './Category/Category';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Lesson from './Lesson/Lesson';
import { History } from './History/History';


export default function Home() {

  const navigate = useNavigate();
  const [categories, setCategories] = useState([])
  const [listLesson, setListLesson] = useState([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false);
  const [itemsLesson, setItemsLesson] = useState([]);
  const [active, setActive] = useState(0)
  const [pageCount, setpageCount] = useState(0);
  const [limitLesson] = useState(8)
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const fullname = localStorage.getItem("fullname");

  // let limitLessonInPage = 8;
  useEffect(() => {
    setLoading(true)
    // Call API Category
    axios({
      method: "get",
      url: "https://english-backend-v2.herokuapp.com/categories",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if(res.status === 200){
        setCategories(res.data.data)
        setLoading(false)
      }
    })
    .catch((err) => {
      console.log(err);
    })

    // Call API ListLesson 1
    axios({
      method: 'GET',
      url: "https://english-backend-v2.herokuapp.com/exams/getListExamByCategory/1",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if(res.status === 200){
        const totalLesson = res.data.data.length;
        setpageCount(Math.ceil(totalLesson / limitLesson));
        setListLesson(res.data.data)
        const newLessonList = res.data.data.slice(0, limitLesson);
        setItemsLesson(newLessonList)
        setLoading(false)
      }
    })
    .catch((err) => {
      console.log(err);
    })

    // Call API History
    axios({
      method: 'GET',
      url: `https://english-backend-v2.herokuapp.com/results/getByUser/${userId}`,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if(res.status === 200){
        setHistory(res.data.data.reverse());
        setLoading(false)
      }
    })
    .catch((err) => {
      console.log(err);
    })

  }, [limitLesson,token,userId])

  const handleGetListByCategory = (categoryId) => {
      setLoading(true)
      axios({
        method: 'GET',
        url: `https://english-backend-v2.herokuapp.com/exams/getListExamByCategory/${categoryId}`,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            const totalLesson = res.data.data.length;
            setpageCount(Math.ceil(totalLesson / limitLesson));
            setListLesson(res.data.data)
            const newLessonList = res.data.data.slice(0, limitLesson);
            setItemsLesson(newLessonList)
            setLoading(false)
          }
        })
        .catch((err) => {
          console.log(err);
        })
  }

  const handleStartLesson = (lessonId) => {
    navigate(`/quiz/${lessonId}`)
  }

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    const newLessonList = listLesson.slice(
      (currentPage - 1) * limitLesson,
      currentPage * limitLesson
    );
    setItemsLesson(newLessonList);
  };

  return (
    <div className="home-page">
      <Header />
      {/* Body */}
      {loading && <SpinLoading />}
      <div className="home-body">
        {/* Left Home */}
        <div className="left-home">
          <div className="user-name">
            {fullname}
          </div>
          <div className="category-container">
            {categories.map((category, index) => {
              return (
                <Category
                  key={category.id}
                  id={category.id}
                  index={index}
                  active={active}
                  setActive={setActive}
                  categoryName={category.categoryName}
                  handleGetList={handleGetListByCategory}
                />
              );
            })}
          </div>
          
        </div>
        {/* Center Home */}
        <div className="center-home">
          <div className="row">
            <form className="col-6 form-search">
              <input className="input-search" placeholder="Search..."></input>
              <button className="btn-search">
                <FontAwesomeIcon icon={faMagnifyingGlass}/> 
              </button>
            </form>
          </div>
          <div className="row list-lesson">
            {itemsLesson.length > 0 ?
              (itemsLesson.map((lesson) => {
                return (
                  <div key={lesson.id} className="col-lg-6 col-md-12">
                    <Lesson
                      lessonId={lesson.id}
                      examName={lesson.examName}
                      totalPoint={lesson.totalPoint}
                      totalTime={lesson.totalTime}
                      handleStartLesson={handleStartLesson}
                    />
                  </div>
                );
              })) :
              (<div className="no-lesson">No Lesson</div>)
            }
          </div>
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            renderOnZeroPageCount={null}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
        {/* Right Home */}
        <div className="right-home">
          <div className="history-title">History</div>
          <div className="list-history">
            {history.map((history) =>{
              return <History key={history.id} history={history} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}