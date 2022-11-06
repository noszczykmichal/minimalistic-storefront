/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { Component } from "react";
import { connect } from "react-redux";

import classes from "./PDP.module.css";

class PDP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainImageURL: this.props.displayedProduct.gallery[0],
    };
  }

  imageToggle = (imageURL) => {
    this.setState({ mainImageURL: imageURL });
  };

  render() {
    const { displayedProduct } = this.props;
    return (
      <section className={classes.section}>
        <div className={classes["thumbnails-wrapper"]}>
          {displayedProduct.gallery.map((imageURL) => (
            <div
              key={imageURL.substring(-2)}
              style={{ backgroundImage: `url(${imageURL})` }}
              className={classes["thumbnails-wrapper__thumbnail"]}
              onClick={(imageURL) => this.imageToggle(imageURL)}
            />
          ))}
        </div>
        <img src={this.state.mainImageURL} alt={displayedProduct.id} />
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    displayedProduct: state.products.currentPDP,
  };
};

export default connect(mapStateToProps)(PDP);
