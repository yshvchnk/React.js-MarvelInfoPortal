import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charList.scss";

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 190,
        charEnded: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
        // window.addEventListener("scroll", this.onScroll);
    }

    componentWillUnmount() {
        // window.removeEventListener("scroll", this.onScroll);
    }

    onScroll = () => {
        const { loading, error, newItemLoading, charEnded } = this.state;
        if (loading || error || newItemLoading || charEnded) {
            return;
        }
        if (
            window.pageYOffset + document.documentElement.clientHeight >
            document.documentElement.scrollHeight - 100
        ) {
            this.onRequest(this.state.offset);
        }
    };

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onLoaded)
            .catch(this.onError);
    };

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,
        });
    };

    onLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        this.setState(({ offset, charList }) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended,
        }));
    };

    onError = () => {
        this.setState({
            error: true,
            loading: false,
        });
    };

    itemRefs = [];

    setHoverRef = (ref) => {
        this.itemRefs.push(ref);
    };

    focusOnItem = (id) => {
        this.itemRefs.forEach((item) =>
            item.classList.remove("char__item_selected")
        );
        this.itemRefs[id].classList.add("char__item_selected");
        this.itemRefs[id].focus();
    };

    renderItems = (arr) => {
        const items = arr.map((item, i) => {
            let imgStyle = { objectFit: "cover" };
            if (item.thumbnail.includes("image_not_available")) {
                imgStyle = { objectFit: "unset" };
            }
            let classesCSS = "char__item";
            if (item.id === this.props.selectedChar) {
                classesCSS += " char__item_selected";
            }
            return (
                <li
                    className={classesCSS}
                    key={item.id}
                    ref={this.setHoverRef}
                    tabIndex="0"
                    onClick={() => {
                        this.props.onCharSelected(item.id);
                        this.focusOnItem(i);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                            this.props.onCharSelected(item.id);
                            this.focusOnItem(i);
                        }
                    }}
                >
                    <img
                        src={item.thumbnail}
                        alt={item.name}
                        style={imgStyle}
                    />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });
        return <ul className="char__grid">{items}</ul>;
    };

    render() {
        const { charList, loading, error, offset, newItemLoading, charEnded } =
            this.state;
        const items = this.renderItems(charList);
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? items : null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{ display: charEnded ? "none" : "block" }}
                    onClick={() => this.onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;
