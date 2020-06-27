import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ListComponent from './components/ListComponent';
import TranscriptComponent from './components/TranscriptComponent';

const API = 'https://2020.ensembl.org/api/popular_genomes';
const DEFAULT_QUERY = 'BRCA2.json?;expand=1';
export const DETAIL_API = 'https://2020.ensembl.org/api/genome/info?genome_id=';

class App extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
      data: [],
      isLoading: false,
      error: null,
      currentGene: null,
      transcriptData: [],
      // lookupData: null
    };
    this.getDetails = this.getDetails.bind(this)
  }
 
  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(API)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        // console.log(data);
        // this.setState({ data: JSON.parse(JSON.stringify(data)), transcript: JSON.parse(JSON.stringify(data.Transcript)),  isLoading: false })
        this.setState({ data: JSON.parse(JSON.stringify(data.popular_species)), isLoading: false })
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  getDetails(transcriptData, error) {
    
    this.setState({ error, isLoading: false })
    // console.log(transcriptData.Transcript);
    this.setState({
      transcriptData: transcriptData.Transcript,
      // lookupData: transcriptData
    });
  }

  render() {
    const { data, isLoading, error, transcriptData } = this.state;
    // console.log(data[0]);
    // console.log(JSON.parse(JSON.stringify(data.Transcript)));
    // console.log(transcriptData);
    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }
    // return <p>sads</p>
    return (
      <React.Fragment>
        <div className='flex-container'>
            {data.map(hit => 
              hit.is_available==true && (<ListComponent getDetails={this.getDetails} key={hit.genome_id} hit={hit}></ListComponent>)
              // (<div key={hit.genome_id} hit={hit} onClick={this.getDetails}><a href='#'><img alt={hit.common_name} src={hit.image}/></a></div>)
            )}
      </div>

        {transcriptData &&transcriptData.map(trans => 
                <TranscriptComponent key={trans.id} trans={trans} error={error}></TranscriptComponent>
            )}
      </React.Fragment>
    );
  }
 
}

export default App;
