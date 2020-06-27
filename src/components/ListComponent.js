import React from 'react';

class ListComponent extends React.Component {

    constructor(props) {
        super();
        this.state = {

        }
        this.getDetails = this.getDetails.bind(this);
    }

    getDetails(event) {
        // console.log(this.props.hit);
        fetch('https://2020.ensembl.org/api/genome/info?genome_id='+this.props.hit.genome_id)
        .then(response => {
            if (response.ok) {
            return response.json();
            } else {
            throw new Error('Something went wrong ...');
            }
        })
        .then(data => {
            // console.log(data);
            // console.log(JSON.parse(JSON.stringify(data.genome_info)));
            data = JSON.parse(JSON.stringify(data.genome_info));
            // console.log(data[0].production_name);
            this.setState({
                productionName: data[0].production_name
            });
            // console.log(data[0]);
            fetch('https://2020.ensembl.org/api/object/track_list?genome_id='+this.props.hit.genome_id+'&type='+data[0].example_objects[0].type+'&stable_id='+data[0].example_objects[0].id)
            .then(response => {
                if (response.ok) {
                return response.json();
                } else {
                throw new Error('No data found for genomeId: '+this.props.hit.genome_id);
                }
            })
            .then(data => {
                // console.log(data);
                fetch('http://rest.ensembl.org/lookup/symbol/'+this.state.productionName+'/'+data.label+'.json?;expand=1')
                .then(response => {
                    if (response.ok) {
                    return response.json();
                    } else {
                        return new Error('No data found for productionName: '+this.state.productionName);
                    }
                })
                .then(data => {
                    // console.log(data);
                    // console.log(data.Transcript[0]);
                    this.props.getDetails(data);
                })
                .catch(error => this.setState({ error, isLoading: false }));
            })
        })
    }

    render() {
        const { error } = this.state;
        const hit = this.props.hit;        
        return(
            <React.Fragment>
                <div key={hit.genome_id} hit={hit} onClick={this.getDetails}>
                    <a href='#'><img alt={hit.common_name} src={hit.image}/></a>
                </div>
            {error && <span>{error.message}</span>}
            </React.Fragment>
        );
    }
}

export default ListComponent;