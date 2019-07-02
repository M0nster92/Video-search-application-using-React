import React from 'react';
import SearchBar from './SearchBar';
import YTSearch from 'youtube-api-search';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

const API_KEY = 'AIzaSyAHH8CtHmIM_rDSUrXtzN4toUgYSaq5gdo';

class App extends React.Component{
    state ={videos:[],selectedVideo: null};

    componentDidMount(){
        this.onTermSubmit('Rockstar');
    }

    onTermSubmit =  (term) => {
    this.searchYT(term);
}

    searchYT = async(term) => {
        await YTSearch({ key: API_KEY, term: term }, videos=> {
            this.setState({videos:videos,
            selectedVideo: videos[0]});

            console.log(videos);
            //this.setState({ video: videos.data.items });
            //console.log(videos.data.items);
        });
    }

    onVideoSelect =(video) =>{
        this.setState({selectedVideo: video});
    };

    render(){
        return (
            <div className="ui container" >
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <div className="ui grid">
            <div className="ui row">
                <div className="eleven wide column">
        <VideoDetail video={this.state.selectedVideo} />
                        </div>
                <div className="five wide column">
        <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos}/>
                        </div>
                    </div>
        </div>
        </div>
        );
    }
}

export default App;
