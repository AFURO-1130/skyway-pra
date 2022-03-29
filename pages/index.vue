<template>
  <div>
    <video id="my-video" width="400px" autoplay muted playsinline></video>
    <p>{{ peerId }}</p>
    <input id="their-id" v-model="theirId" />
    <button @click="makeCall()">発信</button>
    <video id="their-video" width="400px" autoplay muted playsinline></video>
  </div>
</template>

<script>
import Peer from 'skyway-js'
export default {
  data() {
    return {
      localStream: '',
      APIKey: 'b160e98d-c322-4a0a-83df-b5c4e86c8891',
      peer: '',
      peerId: '',
      theirID:''
    }
  },
  methods: {
    makeCall() {
      // const theirID = document.getElementById('their-id').value
      // console.log('theirID',theirID)
      // console.log('hoeg')
      const mediaConnection = this.peer.call(this.theirId, this.localStream)
      this.setEventListener(mediaConnection)
    },
    setEventListener(mediaConnection) {
      mediaConnection.on('stream', (stream) => {
        // video要素にカメラ映像をセットして再生
        const videoElm = document.getElementById('their-video')
        videoElm.srcObject = stream
        videoElm.play()
      })
    },
  },
  mounted() {
    this.peer = new Peer({
      key: this.APIKey,
      debug: 3,
    })
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        // 成功時にvideo要素にカメラ映像をセットし、再生
        const videoElm = document.getElementById('my-video')
        videoElm.srcObject = stream
        videoElm.play()
        // 着信時に相手にカメラ映像を返せるように、グローバル変数に保存しておく
        this.localStream = stream
      })
      .catch((error) => {
        // 失敗時にはエラーログを出力
        console.error('mediaDevice.getUserMedia() error:', error)
      })
    this.peer.on('open', () => {
      this.peerId = this.peer.id
    })
    this.peer.on('call', (mediaConnection) => {
      console.log('着信あり')
      mediaConnection.answer(this.localStream)
      this.setEventListener(mediaConnection)
    })
  },
}
</script>
