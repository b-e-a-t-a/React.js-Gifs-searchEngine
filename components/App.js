//var GIPHY_API_URL
//var GIPHY_PUB_KEY

App = React.createClass({

	getInitialState() {
		return {
			loading: false,
			searchingText: '',
			gif: {}
		};
	},

	handleSearch: function(searchingText) {
		this.setState({
			loading: true
		});
		this.getGif(searchingText, function(gif) {
			this.setState({
				loading: false,
				gif: gif,
				searchingText: searchingText
			});
		}.bind(this));
	},

	getGif: function(searchingText, callback) {  // 1.
	    var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
	    var xhr = new XMLHttpRequest();  // 3.
	    xhr.open('GET', url);
	    xhr.onload = function() {
	        if (xhr.status === 200) {
	           var data = JSON.parse(xhr.responseText).data; // 4.
	            var gif = {  // 5.
	                url: data.fixed_width_downsampled_url,
	                sourceUrl: data.url
	            };
	            callback(gif);  // 6.
	        }
	    };
	    xhr.send();
	},

	render: function() {

//style dodane inline a nie poprzez className; obiekt o dowolnej nazwie
		var styles = {
			margin: '0 auto',
			textAlign: 'center',
			width: '90%'
		};

		return (
			<div style={styles}>
				<h1>Giphs Search Engine</h1>
				<p>Find a giph on <a href='http://giphy.com'>giphy</a>. Press enter to load more giphs.</p>
				<Search onSearch={this.handleSearch}/>
				<Gif
				    loading={this.state.loading}
				    url={this.state.gif.url}
				    sourceUrl={this.state.gif.sourceUrl}
				/>
			</div>
		);
	}
});
