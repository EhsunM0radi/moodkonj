<template>
  <div class="chat">
    <PinnedTop ref="pinnedRef" :score="currentScore" :voted="voted" @vote="vote" />
    <BottomBar
      :targetName="targetName"
      :choice="choice"
      v-model:proposalText="proposalText"
      :requiredLikes="requiredLikes"
      :canFinalize="canFinalize"
      @choose="choose"
      @sendProposal="sendProposal"
      @finalize="finalize"
    />
    <MessagesList
      ref="messagesRef"
      :messages="messages"
      :height="messagesHeight"
      :myName="myName"
      :othersName="targetName"
      :showNames="true"
      @like="like"
      @selectProposal="selectProposal"
    />
    <ChatBar ref="chatbarRef" v-model:text="text" @send="sendChat" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import PinnedTop from './components/PinnedTop.vue'
import BottomBar from './components/BottomBar.vue'
import MessagesList from './components/MessagesList.vue'
import ChatBar from './components/ChatBar.vue'

type Vote = 'done' | 'not' | null
type Msg = {
  id: string
  text: string
  sender: 'me' | 'you'
  type: 'chat' | 'proposal'
  likes?: number
  liked?: boolean
  senderName?: string
}

const route = useRoute()
const targetName = computed(() => (route.query.name as string) || 'بازیکن')
const playersCount = computed(() => Number(route.query.count ?? 6))
const requiredLikes = computed(() => Math.max(playersCount.value - 1, 1))

const voted = ref<Vote>(null)
const currentScore = ref(0)
const vote = (v: Exclude<Vote, null>) => {
  if (voted.value) return
  voted.value = v
  currentScore.value += v === 'done' ? 1 : -1
}

const messages = ref<Msg[]>([])
type ElRef = { el: HTMLElement | null }
const messagesRef = ref<ElRef | null>(null)
const scrollToNewest = () => {
  messagesRef.value?.el?.scrollTo({ top: 0 })
}
onMounted(scrollToNewest)
watch(() => messages.value.length, scrollToNewest)
const pinnedRef = ref<ElRef | null>(null)
const chatbarRef = ref<ElRef | null>(null)
const pinnedH = ref(0)
const chatbarH = ref(0)
const measureHeights = () => {
  pinnedH.value = pinnedRef.value?.el?.offsetHeight || 0
  chatbarH.value = chatbarRef.value?.el?.offsetHeight || 78
}
onMounted(() => {
  measureHeights()
  window.addEventListener('resize', measureHeights)
})
onUnmounted(() => {
  window.removeEventListener('resize', measureHeights)
})
const messagesHeight = computed(
  () => `calc(100vh - ${pinnedH.value}px - ${chatbarH.value}px - 16px)`,
)
const myName = computed(() => 'من')
const proposalText = ref('')
const sendProposal = () => {
  if (!choice.value || !proposalText.value.trim()) return
  const id = `p${Date.now()}`
  messages.value.push({
    id,
    text: proposalText.value,
    sender: 'me',
    type: 'proposal',
    likes: 0,
    liked: false,
    senderName: myName.value,
  })
  proposalText.value = ''
  scrollToNewest()
}
const text = ref('')
const sendChat = () => {
  if (!text.value.trim()) return
  const id = `c${Date.now()}`
  messages.value.push({
    id,
    text: text.value.trim(),
    sender: 'me',
    type: 'chat',
    likes: 0,
    liked: false,
    senderName: myName.value,
  })
  text.value = ''
  scrollToNewest()
}
const like = (m: Msg) => {
  if (m.type !== 'proposal' || m.liked) return
  m.likes = (m.likes || 0) + 1
  m.liked = true
}

const choice = ref<'truth' | 'dare' | null>(null)
const choose = (c: 'truth' | 'dare') => {
  choice.value = c
}
const selectedProposalId = ref<string | null>(null)
const selectProposal = (id: string) => {
  selectedProposalId.value = id
}
const selectedProposal = computed(() =>
  messages.value.find((m) => m.id === selectedProposalId.value),
)
const canFinalize = computed(
  () =>
    !!choice.value &&
    !!selectedProposal.value &&
    (selectedProposal.value.likes || 0) >= requiredLikes.value,
)
const finalize = () => {
  // placeholder finalize
}
</script>

<style scoped>
.chat {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  padding-bottom: var(--chatbar-h);
}
:root {
  --chatbar-h: 78px;
}
</style>
