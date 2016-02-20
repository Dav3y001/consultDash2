var CommentBox = React.createClass({
	getInitialState: function () {
		return {
			rpm: 0,
			mph: 0
		};
	},
	componentDidMount: function () {
		var that = this;
		this.socket = io();
		this.socket.on('ecuData', function (data) {
			that.setState({ rpm: data.rpm });
			that.setState({ mph: data.mph });
		});
		this.socket.emit('fetchComments');
	},
	needlePosition: function (rpm) {
		percentRPM = rpm / 12000 * 360 + 90;
		needleStyle = {
			transform : 'rotate(' + percentRPM + 'deg)'
		};
		console.log(needleStyle);
		return needleStyle;
	},
	render: function() {
		return (
			<div className="commentBox">
				<p>{this.state.rpm}</p>
				<p>{this.state.mph}</p>
				<img className='dial' src='./dial.png' />
				<img style={this.needlePosition(this.state.rpm)} className='needle' src='./needle.png' />
			</div>
		);
	}
});

React.render(
	<CommentBox/>,
	document.getElementById('content')
);