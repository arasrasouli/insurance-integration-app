<template>
  <div class="fall-details-card">
    <div class="fall-details-header">
      <h3>Fall Details</h3>
    </div>

    <div class="fall-details-content">
      <div class="fall-section">
        <h4>Patient Information</h4>
        <p><strong>Patient Name:</strong> {{ fall.patientName }}</p>
        <p><strong>Patient ID:</strong> {{ fall.patientId }}</p>
        <p><strong>Room Number:</strong> {{ fall.roomNo }}</p>
        <p><strong>Bed ID:</strong> {{ fall.bedId }}</p>
        <p><strong>Was Patient Alone:</strong> {{ fall.wasPatientAlone ? 'Yes' : 'No' }}</p>
      </div>

      <div class="fall-section">
        <h4>Fall Information</h4>
        <p><strong>ID:</strong> {{ fall.id }}</p>
        <p><strong>Fall At:</strong> {{ formatDate(fall.fallAt) }}</p>
        <p><strong>Fall Type:</strong> {{ fall.fallType }}</p>
        <p><strong>Fall Detection:</strong> {{ fall.fallDetection }}</p>
        <p><strong>Reason:</strong> {{ fall.reason || '—' }}</p>
        <p><strong>Lay Time (s):</strong> {{ fall.layTime }}</p>
        <p><strong>Reaction Time (s):</strong> {{ fall.reactionTime }}</p>
        <p><strong>Has Report:</strong> {{ fall.hasReport ? 'Yes' : 'No' }}</p>
        <p><strong>Was Annotated:</strong> {{ fall.wasAnnotated ? 'Yes' : 'No' }}</p>
        <p><strong>Reviewed At:</strong> {{ formatDate(fall.reviewedAt) }}</p>
        <p><strong>Resolved At:</strong> {{ formatDate(fall.resolvedAt) }}</p>
        <p><strong>Updated At:</strong> {{ formatDate(fall.updatedAt) }}</p>
      </div>

      <div class="fall-section">
        <h4>Media</h4>
        <p>
          <strong>Thumbnail:</strong>
          <span v-if="fall.thumbnailUrl">
            <img :src="fall.thumbnailUrl" alt="Fall Thumbnail" class="thumbnail-preview" />
          </span>
          <span v-else>—</span>
        </p>
        <p>
          <strong>Video:</strong>
          <span v-if="fall.videoUrl">
            <a :href="fall.videoUrl" target="_blank" class="video-link">
              <i class="pi pi-video text-blue-600"></i> View Video
            </a>
          </span>
          <span v-else>—</span>
        </p>
      </div>

      <div class="fall-section">
        <h4>Insurance Information</h4>
        <p v-if="insuranceLoading">Loading insurance data...</p>
        <template v-else>
          <p><strong>Insurance Number:</strong> {{ insurance?.insuranceNumber ?? 'N/A' }}</p>
          <p><strong>Insurance Level:</strong> {{ insurance?.insuranceLevel ?? 'N/A' }}</p>
          <p><strong>Description:</strong> {{ insurance?.description ?? 'N/A' }}</p>
        </template>
      </div>

      <div class="fall-details-actions">
        <Button label="Submit Claim" icon="pi pi-send" severity="success" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { FallModel } from '~/entities/fall/fall.model'
import type { PatientInsuranceModel } from '~/entities/insurance/insurance.model'
import { InsuranceService } from '~/features/insurance/service/InsuranceService'
import Button from 'primevue/button'

const props = defineProps<{ fall: FallModel }>()
defineEmits<{ (e: 'back'): void }>()

const insurance = ref<PatientInsuranceModel | null>(null)
const insuranceLoading = ref(false)
const insuranceService = new InsuranceService()

onMounted(async () => {
  if (props.fall.patientId) {
    insuranceLoading.value = true
    try {
      insurance.value = await insuranceService.getPatientInsurance(props.fall.patientId)
    } finally {
      insuranceLoading.value = false
    }
  }
})

function formatDate(date: Date | string | null) {
  if (!date) return '—'
  return new Date(date).toLocaleString()
}
</script>

<style scoped src="~/assets/components/fallDetailsCard.css" />
