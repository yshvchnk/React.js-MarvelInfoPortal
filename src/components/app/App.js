import { Component } from "react/cjs/react.production.min";
import PropTypes from "prop-types";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from "../../resources/img/vision.png";

class App extends Component {
    state = {
        selectedChar: null,
    };

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id,
        });
    };

    render() {
        return (
            <div className="app">
                <AppHeader />
                <main>
                    <ErrorBoundary>
                        <RandomChar />
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList
                                onCharSelected={this.onCharSelected}
                                selectedChar
                            />
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharInfo charId={this.state.selectedChar} />
                        </ErrorBoundary>
                    </div>
                    <img
                        className="bg-decoration"
                        src={decoration}
                        alt="vision"
                    />
                </main>
            </div>
        );
    }
}

CharInfo.propTypes = {
    onCharSelected: PropTypes.func,
};

export default App;