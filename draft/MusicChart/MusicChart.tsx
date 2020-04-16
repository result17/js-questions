import React, { FC, useEffect, useRef } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import ReactEcharts from 'echarts-for-react'
import bgm from 'asserts/songs/bgm.mp3' 

const UPDATE_DURATION: number = 100

const option = {
  tooltip: {},
  visualMap: {
    show: false,
    min: 0.1,
    max: 4,
    inRange: {
      color: ['#010103', '#2f490c', '#b0b70f', '#fdff44', '#fff']
    }
  },
  xAxis3D: {
    type: 'value'
  },
  yAxis3D: {
    type: 'value'
  },
  zAxis3D: {
    type: 'value',
    min: -6,
    max: 6
  },
  grid3D: {
    show: false,
    environment: '#000',
    viewControl: {
        distance: 100
    },
    postEffect: {
      enable: true,
      FXAA: {
        enable: true
      }
    },
    light: {
      main: {
        shadow: true,
        intensity: 10,
        quality: 'high'
      },
      ambientCubemap: {
    //   texture: ROOT_PATH + 'data-gl/asset/canyon.hdr',
        exposure: 0,
        diffuseIntensity: 0.2
      }
    }
  },
  series: [{
    type: 'bar3D',
    silent: true,
    shading: 'lambert',
    data: [] as number[][],
    barSize: 1,
    lineStyle: {
        width: 4
    },
    // animation: false,
    animationDurationUpdate: UPDATE_DURATION
  }]
}

const initVisualizer = (audioBuffer: AudioBuffer) => {
  const inited = true
  const source = audioContext.createBufferSource()
  source.buffer = audioBuffer

  source.start(0)
  
  const analyzer = audioContext.createAnalyser()
  const gainNode = audioContext.createGain()
  analyzer.fftSize = 4096

  gainNode.gain.value = 1
  source.connect(gainNode)
  gainNode.connect(analyzer)
  analyzer.connect(audioContext.destination)
  
  const frequencyBinCount = analyzer.frequencyBinCount
  const dataArray = new Uint8Array(frequencyBinCount)

  const beta = 0

  const update = () => {
    analyzer.getByteFrequencyData(dataArray)
    const size = 50
    const dataProvider: number[][] = []
    
    for (let i = 0; i < size * size; i++) {
      const x = i % size
      const y = Math.floor(i / size)
      const dx = x - size / 2
      const dy = y -size / 2

      let angle = Math.atan2(dy, dx)
      if (angle < 0) {
        angle = Math.PI * 2 + angle
      }

      const dist = Math.sqrt(dx * dx + dy * dy)
      const idx  = Math.min(
        frequencyBinCount - 1, Math.round(angle / Math.PI / 2 * 60 + dist * 60) + 100
      )

      const val = Math.pow(dataArray[idx] / 100, 3)
      dataProvider.push([x, y, Math.max(val, 0.1)]);
    }

  }
}

const MusicChart: FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const optionContainer = useRef(option)

  useEffect(() => {
    const reader = new FileReader()
    const audioContext = new AudioContext()
    reader.onload = (evt) => {
      audioContext.decodeAudioData(evt.target.result as ArrayBuffer)
    }
    reader.readAsArrayBuffer(bgm)
    return () => {
      audioContext.close()
    }
  }, [])

  return (
    <ReactEcharts
      option={ optionContainer.current }
      style={{ height: '100%', width: '100%' }}
    ></ReactEcharts>
  )
}

export default MusicChart