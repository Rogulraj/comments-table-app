import "./index.css";

import {
  authorSort,
  dateSort,
  likeSort,
  replySort,
  textSort,
} from "../../TableFilters/index";

import React, { Component } from "react";

import { RiArrowUpDownFill } from "react-icons/ri";

export default class Table extends Component {
  state = {
    sortBy: "",
    listItem: [...this.props.commentsList],
  };

  componentDidUpdate(prevProps) {
    if (prevProps.commentsList !== this.props.commentsList) {
      this.setState({
        listItem: [...this.props.commentsList],
      });
    }
  }

  componentDidMount() {
    this.onChangeSortBy("date");
  }

  onChangeSortBy = (sort) => {
    let finalList;
    const { commentsList } = this.props;

    switch (sort) {
      case "date":
        finalList = dateSort(commentsList);
        break;
      case "author":
        finalList = authorSort(commentsList);
        break;
      case "text":
        finalList = textSort(commentsList);
        break;
      case "like":
        finalList = likeSort(commentsList);
        break;
      case "reply":
        finalList = replySort(commentsList);
        break;

      default:
        finalList = [];
        break;
    }

    this.setState((prevState) => ({
      sortBy: sort,
      listItem: finalList,
    }));
  };

  render() {
    const { rowCount, currentPage } = this.props;
    const { sortBy, listItem } = this.state;

    const startIndex = (currentPage - 1) * rowCount;
    const endIndex = currentPage * rowCount;

    const slicedList = listItem.slice(startIndex, endIndex);

    if (slicedList.length === 0) {
      return (
        <p className="table-data-not-exist">
          Search Word Does Not Exist In The Table !!!..
        </p>
      );
    }

    return (
      <table className="table-main-container">
        <thead className="table-heading-col">
          <tr>
            <th
              className="table-headings"
              onClick={() => this.onChangeSortBy("date")}
            >
              Date {"   "}
              {sortBy === "date" ? (
                <span>
                  <RiArrowUpDownFill size={17} color="#000000" />
                </span>
              ) : null}
            </th>
            <th
              className="table-headings"
              onClick={() => this.onChangeSortBy("author")}
            >
              Author {"   "}
              {sortBy === "author" ? (
                <span>
                  <RiArrowUpDownFill size={17} color="#000000" />
                </span>
              ) : null}
            </th>
            <th
              className="table-headings"
              onClick={() => this.onChangeSortBy("text")}
            >
              Comment {"   "}
              {sortBy === "text" ? (
                <span>
                  <RiArrowUpDownFill size={17} color="#000000" />
                </span>
              ) : null}
            </th>
            <th
              className="table-headings"
              onClick={() => this.onChangeSortBy("like")}
            >
              Like {"   "}
              {sortBy === "like" ? (
                <span>
                  <RiArrowUpDownFill size={17} color="#000000" />
                </span>
              ) : null}
            </th>
            <th
              className="table-headings"
              onClick={() => this.onChangeSortBy("reply")}
            >
              Reply {"   "}
              {sortBy === "reply" ? (
                <span>
                  <RiArrowUpDownFill size={17} color="#000000" />
                </span>
              ) : null}
            </th>
          </tr>
        </thead>
        <tbody className="table-content-row">
          {slicedList.map((item) => (
            <tr key={item.at}>
              <td>{new Date(item.at).toLocaleDateString()}</td>
              <td>{item.author}</td>
              <td>{item.text}</td>
              <td>{item.like}</td>
              <td>{item.reply}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
