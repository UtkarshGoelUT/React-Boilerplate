import React from 'react';
import Header from './Header';
import Options from './Options';
import Action from './Action';
import AddOption from './AddOption';
import OptionModal from './OptionModal';

export default class IndicisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };

    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({ selectedOption: option }));
    }

    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    }

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({ options: prevState.options.filter((option) => (option !== optionToRemove)) }));
    }

    handleAddOption = (option) => {
        if (!option) {
            return 'Add some option';
        }
        if (this.state.options.indexOf(option) > -1) {
            return 'This option is already present';
        }
        this.setState((prevState) => ({ options: prevState.options.concat(option) }));
    }

    handleClearSelectedOption = () => {
        this.setState(() => ({ selectedOption: undefined }));
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if (options) {
                this.setState(() => ({ options }));
            }
        }
        catch (e) { }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.lenght) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    render() {
        return (
            <div>
                <Header title="Indecision" subtitle="Let it choose for you" />
                <div className="container">
                    <Action handlePick={this.handlePick} hasOption={this.state.options.length > 0} />
                    <div className="widget">
                        <Options
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption
                            handleAddOption={this.handleAddOption}
                        />
                    </div>
                </div>
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleClearSelectedOption={this.handleClearSelectedOption}
                />
            </div>
        )
    }
}