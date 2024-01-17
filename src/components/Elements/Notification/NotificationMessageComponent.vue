<template>
  <transition-group name="p-message" tag="div">
    <Message
        class="noti-message"
        v-if="messages && messages.length > 0"
        :key="index"
        v-for="(message, index) in messages"
        :severity="message.severity"
        :closable="false"
        @onClose="handleClose(message)"
    >
    <MDBRow style="min-width: 16rem;" class="w-100">
      <MDBCol class="col-auto">
        <span class="title">{{ message.summary }}</span>
      </MDBCol>
      <MDBCol class="col-auto">
      </MDBCol>
    </MDBRow>
    <MDBRow>
      <MDBCol class="d-flex flex-column col-auto">
        {{ message.text }}
        <span class="date-time">
          {{message.dateTime}}
        </span>
      </MDBCol>
    </MDBRow>
    </Message>
    <div class="no-notifications" v-else>
      No notifications
    </div>
  </transition-group>
</template>

<script lang="ts">
import Message from 'primevue/message';
import { MDBRow, MDBCol } from 'mdb-vue-ui-kit';

export default {
  components: {
    Message,
    MDBRow,
    MDBCol,
  },
  props: {
    messages: {
      type: Array,
    },
  },
  methods: {
    handleClose(message) {
      // Оповестить о закрытии текущего уведомления
      this.$emit('close', message);
    },
  }
};
</script>

<style scoped>
.noti-message {
  width: 100%;
}
:deep(.p-message-wrapper) {
  width: 100%;
  min-width: min-content;
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  flex-wrap: wrap;
  align-items: flex-start;
}
.date-time {
  font-weight: 400;
  font-size: 0.8rem;
  opacity: 0.5;
}
.title {
  font-weight: 600;
}
</style>
