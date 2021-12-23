import	React				from	'react';

function	Flag({width = 32, height = 24}) {
	return (
		<svg width={width} height={height} viewBox={'0 0 32 24'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
			<mask id={'a'} maskUnits={'userSpaceOnUse'} x={'0'} y={'0'} width={'32'} height={'24'}>
				<path fill={'#fff'} d={'M0 0h32v24H0z'}/>
			</mask>
			<g mask={'url(#a)'}>
				<path fillRule={'evenodd'} clipRule={'evenodd'} d={'M0 0v24h32V0H0z'} fill={'#3D58DB'}/>
				<mask id={'b'} maskUnits={'userSpaceOnUse'} x={'0'} y={'0'} width={'32'} height={'24'}>
					<path fillRule={'evenodd'} clipRule={'evenodd'} d={'M0 0v24h32V0H0z'} fill={'#fff'}/>
				</mask>
				<g mask={'url(#b)'} fillRule={'evenodd'} clipRule={'evenodd'}>
					<path d={'M0 0v8h32V0H0z'} fill={'#F7FCFF'}/>
					<path d={'M0 16v8h32v-8H0z'} fill={'#C51918'}/>
				</g>
			</g>
		</svg>
	);
}

export default Flag;