<template>
  <div class="claim-submission-card">
    <h3>Submit Claim</h3>

    <div v-if="submitResult" class="claim-success">
      <p class="text-green-600 font-semibold">✅ Claim submitted successfully!</p>
      <Button
        label="Close"
        icon="pi pi-times"
        severity="secondary"
        @click="$emit('cancel')"
      />
    </div>

    <template v-else>
      <div class="claim-section">
        <p><strong>Fall ID:</strong> {{ fallId }}</p>
        <p><strong>Insurance Number:</strong> {{ insuranceNumber }}</p>
      </div>

      <div class="claim-section">
        <label for="claimType"><strong>Claim Type:</strong></label>
        <div class="flex items-center gap-2">
          <Select
            id="claimType"
            v-model="selectedClaimType"
            :options="claimTypeOptions"
            optionLabel="description"
            optionValue="code"
            class="w-60"
          />
          <span v-if="isLoading" class="text-sm text-gray-500">Loading…</span>
        </div>
        <p v-if="loadError" class="text-sm text-red-600 mt-2">
          Failed to load claim types: {{ loadError }}
        </p>
        <Button
          v-if="loadError && !useFallback"
          size="small"
          text
          severity="danger"
          label="Show claim test types"
          class="mt-2"
          @click="useFallback = true"
        />
      </div>

      <div v-if="submitError" class="text-red-600 text-sm mt-2">
        Failed to submit claim: {{ submitErrorMessage }}
      </div>

      <div class="claim-actions">
        <Button
          label="Submit"
          icon="pi pi-check"
          severity="success"
          :disabled="!canSubmit || isSubmitting"
          @click="submit"
        />
        <Button
          label="Cancel"
          icon="pi pi-times"
          severity="secondary"
          :disabled="isSubmitting"
          @click="$emit('cancel')"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Button from 'primevue/button'
import Select from 'primevue/select'
import { useClaim } from '~/features/claim/composable/useClaim'
import type { ClaimTypeModel } from '~/entities/claim/claim.model'

const props = defineProps<{
  fallId: number
  insuranceNumber: string
}>()

const emit = defineEmits<{ (e: 'cancel'): void }>()

const {
  claimTypes,
  isLoading,
  error,
  fetchTypes,
  isSubmitting,
  submitError,
  submitResult,
  submitClaim,
} = useClaim()

const fallbackTypes: ClaimTypeModel[] = [
  { code: 'FALL_INJURY', description: 'Fall Injury' },
  { code: 'RANDOM_WRONG_TYPE', description: 'Random Wrong Type (test)' },
]
const useFallback = ref(false)

const claimTypeOptions = computed<ClaimTypeModel[]>(() =>
  useFallback.value ? fallbackTypes : claimTypes.value
)

const selectedClaimType = ref<string | null>(null)

const loadError = computed(() =>
  error.value ? (error.value instanceof Error ? error.value.message : String(error.value)) : ''
)
const submitErrorMessage = computed(() =>
  submitError.value ? (submitError.value instanceof Error ? submitError.value.message : String(submitError.value)) : ''
)

const canSubmit = computed(() =>
  Number.isFinite(props.fallId) &&
  props.fallId > 0 &&
  !!props.insuranceNumber?.trim() &&
  !!selectedClaimType.value
)

async function submit() {
  if (!canSubmit.value) return
  try {
    await submitClaim({
      fallId: props.fallId,
      insuranceNumber: props.insuranceNumber,
      claimType: selectedClaimType.value as string,
    })
  } catch {
  }
}

onMounted(() => {
  fetchTypes()
})
</script>

<style scoped src="~/assets/components/ClaimSubmissionForm.css" />
