<template>
  <q-page class="row">
    <vue-advanced-chat
      class="chat full-width"
      height="100%"
      :current-user-id="currentUserId"
      :rooms="JSON.stringify(rooms)"
      :messages="JSON.stringify(messages)"
      @fetch-messages="onFetchMessages($event.detail[0])"
      @fetch-more-rooms="onFetchMoreRooms"
      @send-message="onSendMessage($event.detail[0])"
      :messages-loaded="messagesLoaded"
      :rooms-loaded="roomsLoaded"
      :loading-rooms="loadingRoomsInitial"
      :show-files="false"
      :show-audio="false"
    />
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { uid } from 'quasar'
import { formatTimestamp, parseTimestamp } from 'src/utils/date'
defineOptions({
  name: 'IndexPage'
})

const currentUserId = ref('123')

const roomsMap = ref(new Map([[
  '1', {
    roomId: '1',
    roomName: 'Room 1',
    avatar: 'https://sun9-68.userapi.com/impg/mnPcQZby3mHrNN62Lnfwb00SRodnauiRdlV2iA/Z-GNdtlXlhc.jpg?size=1441x2160&quality=95&sign=20b016d78fade14b5992ee3be3a5150c&type=album',
    unreadCount: 4,
    index: 3
  }
]]))

const rooms = computed({
  get: () => Array.from(roomsMap.value.values()),
  set: (value) => {
    roomsMap.value.set(value.roomId, value)
  }
})

console.log(rooms.value)
const messages = ref([])

const loadingRoomsInitial = ref(true)
const roomsLoaded = ref(false)
const messagesLoaded = ref(false)

const onFetchMessages = ({ room, options }) => {
  messagesLoaded.value = false

  // use timeout to imitate async server fetched data
  setTimeout(() => {
    messages.value = []
    messagesLoaded.value = true
  })
}

const onFetchMoreRooms = () => {
  setTimeout(() => {
    roomsLoaded.value = true
  })
}

const onSendMessage = ({ roomId, content, files, replyMessage, usersTag }) => {
  const timestamp = new Date()

  const newMessage = {
    _id: uid(),
    content,
    senderId: currentUserId.value,
    username: 'John Doe',
    timestamp: formatTimestamp(
      timestamp,
      new Date()
    ),
    date: parseTimestamp(timestamp, 'DD MMMM YYYY'),
    saved: true,
    distributed: false,
    seen: false,
    new: true
  }

  roomsMap.value.set(roomId, {
    ...roomsMap.value.get(roomId),
    unreadCount: 0,
    lastMessage: newMessage
  })
  messages.value.push(newMessage)
}

onMounted(() => {
  setTimeout(() => {
    loadingRoomsInitial.value = false
  }, 1000)
})
</script>

<style scoped>
.chat {
  max-height: 100%;
  height: 100vh;
}
</style>
