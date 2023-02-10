import React, { Component } from "react";

import Loader from "react-loader-spinner";

import "./index.css";
import Table from "../Table";
import Pagination from "../Pagination/index";

const apiStatus = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failed: "FAILED",
};

export default class Tabular extends Component {
  state = {
    commentsList: [],
    apiResponse: apiStatus.initial,
    filterText: "",
    rowCount: "25",
    filterList: ["name"],
    currentPage: 1,
  };

  componentDidMount = () => {
    this.getCommentsList();
  };

  getCommentsList = async () => {
    this.setState({
      apiResponse: apiStatus.loading,
    });
    const url = "https://dev.ylytic.com/ylytic/test";

    const fetchMethod = await fetch(url);

    if (fetchMethod.ok) {
      const fetchResponse = await fetchMethod.json();

      this.setState({
        commentsList: fetchResponse.comments,
        apiResponse: apiStatus.success,
      });
    } else {
      this.setState({
        commentsList: [],
        apiResponse: apiStatus.failed,
      });
    }
  };

  onChangeFilterText = (event) => {
    const { value } = event.target;

    this.setState({
      filterText: value,
    });
  };

  onChangeRowCount = (event) => {
    this.setState({
      rowCount: event.target.value,
    });
  };

  onChangeCurrentPage = (pageNumber) => {
    this.setState({
      currentPage: pageNumber,
    });
  };

  render() {
    const { commentsList, filterText, rowCount, currentPage } = this.state;

    let filteringCommentsList = commentsList.filter(
      (item) =>
        item.author.includes(filterText) || item.text.includes(filterText)
    );

    return (
      <div className="tabular-main-container">
        <h1 className="tabular-main-heading">YOUTUBE COMMENTS TABLE</h1>
        <div className="tabular-filter-rowcount-container">
          <input
            type="search"
            placeholder="Filter"
            onChange={this.onChangeFilterText}
            className="tabular-filter-text"
          />
          <select className="tabular-rowcount" onChange={this.onChangeRowCount}>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>
        </div>
        <div className="tabular-pagination-container">
          <Pagination
            rowCount={rowCount}
            totalListCount={filteringCommentsList.length}
            onChangeCurrentPage={this.onChangeCurrentPage}
          />
        </div>
        <div className="tabular-table-container">
          {commentsList.length === 0 ? (
            <Loader
              type="TailSpin"
              color="lightseagreen"
              height={40}
              width={50}
            />
          ) : (
            <Table
              commentsList={filteringCommentsList}
              currentPage={currentPage}
              rowCount={parseInt(rowCount)}
            />
          )}
        </div>
      </div>
    );
  }
}
