"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useResponsive } from "@/hooks/useResponsive"

interface ContactFormData {
  name: string
  phone: string
  budget: string
  requirements: string
  preferredContact: 'phone' | 'telegram'
}

interface FormErrors {
  name?: string
  phone?: string
  requirements?: string
}

interface FormState {
  isSubmitting: boolean
  isSuccess: boolean
  isError: boolean
  errorMessage?: string
}

const ContactFormSection: React.FC = () => {
  const { isSmallScreen, isTouch } = useResponsive();
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    budget: '',
    requirements: '',
    preferredContact: 'phone'
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    isError: false
  })


  // Load form data from localStorage on component mount
  React.useEffect(() => {
    const savedFormData = localStorage.getItem('contactFormData')
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData)
        setFormData(parsedData)
      } catch (error) {
        console.error('Error loading saved form data:', error)
      }
    }
  }, [])

  // Save form data to localStorage whenever it changes
  React.useEffect(() => {
    if (formData.name || formData.phone || formData.requirements) {
      localStorage.setItem('contactFormData', JSON.stringify(formData))
    }
  }, [formData])

  // Clear localStorage when form is successfully submitted
  const clearSavedFormData = () => {
    localStorage.removeItem('contactFormData')
  }

  // Phone number formatting function
  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '')
    
    // If starts with 8, replace with 7
    const normalizedDigits = digits.startsWith('8') ? '7' + digits.slice(1) : digits
    
    // Format as +7-XXX-XXX-XXXX
    if (normalizedDigits.length === 0) return ''
    if (normalizedDigits.length <= 1) return `+${normalizedDigits}`
    if (normalizedDigits.length <= 4) return `+${normalizedDigits.slice(0, 1)}-${normalizedDigits.slice(1)}`
    if (normalizedDigits.length <= 7) return `+${normalizedDigits.slice(0, 1)}-${normalizedDigits.slice(1, 4)}-${normalizedDigits.slice(4)}`
    return `+${normalizedDigits.slice(0, 1)}-${normalizedDigits.slice(1, 4)}-${normalizedDigits.slice(4, 7)}-${normalizedDigits.slice(7, 11)}`
  }

  // Validation functions
  const validatePhone = (phone: string): boolean => {
    const digits = phone.replace(/\D/g, '')
    return digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно для заполнения'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа'
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Телефон обязателен для заполнения'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Введите корректный номер телефона'
    }

    // Requirements validation
    if (!formData.requirements.trim()) {
      newErrors.requirements = 'Опишите ваши требования к ПК'
    } else if (formData.requirements.trim().length < 10) {
      newErrors.requirements = 'Опишите требования более подробно (минимум 10 символов)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    if (field === 'phone') {
      value = formatPhoneNumber(value)
    }
    
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error for this field when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const submitFormData = async (data: ContactFormData, attempt: number = 1): Promise<void> => {
    const maxRetries = 3
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          source: 'website_contact_form',
          attempt
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return response.json()
    } catch (error) {
      // Retry logic for network errors
      if (attempt < maxRetries && (
        error instanceof TypeError || // Network error
        (error instanceof Error && error.message.includes('fetch'))
      )) {
        console.log(`Attempt ${attempt} failed, retrying...`)
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt)) // Exponential backoff
        return submitFormData(data, attempt + 1)
      }
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Reset previous states
    setFormState(prev => ({ ...prev, isError: false, errorMessage: undefined }))
    
    if (!validateForm()) {
      return
    }

    setFormState(prev => ({ ...prev, isSubmitting: true }))
    
    try {
      // Submit form data to API
      await submitFormData(formData)
      
      // Set success state
      setFormState({
        isSubmitting: false,
        isSuccess: true,
        isError: false
      })
      
      // Reset form on success
      setFormData({
        name: '',
        phone: '',
        budget: '',
        requirements: '',
        preferredContact: 'phone'
      })
      
      // Clear saved form data
      clearSavedFormData()
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setFormState(prev => ({ ...prev, isSuccess: false }))
      }, 5000)
      
    } catch (error) {
      console.error('Form submission error:', error)

      
      let errorMessage = 'Произошла неизвестная ошибка'
      
      if (error instanceof Error) {
        if (error.message.includes('fetch') || error instanceof TypeError) {
          errorMessage = 'Проблема с подключением к интернету. Проверьте соединение и попробуйте еще раз.'
        } else {
          errorMessage = error.message
        }
      }
      
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage
      })
    }
  }

  return (
    <section className={`${isSmallScreen ? 'py-12' : 'py-16'} px-4 bg-background/95`}>
      <div className="container mx-auto max-w-2xl">
        <div className={`text-center ${isSmallScreen ? 'mb-8' : 'mb-12'}`}>
          <h2 className={`${
            isSmallScreen ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'
          } font-bold mb-4 text-foreground`}>
            Свяжитесь с нами
          </h2>
          <p className={`text-muted-foreground ${isSmallScreen ? 'text-base' : 'text-lg'}`}>
            Оставьте заявку и мы подберем идеальный игровой ПК под ваши задачи и бюджет
          </p>
        </div>

        <Card className="border-gray-100 shadow-lg bg-card backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-center">Форма обратной связи</CardTitle>
            <CardDescription className="text-center">
              Заполните форму и мы свяжемся с вами
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Success Message */}
            {formState.isSuccess && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-green-400 font-medium">Заявка успешно отправлена!</h4>
                    <p className="text-green-300/80 text-sm">Мы свяжемся с вами в ближайшее время для консультации.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {formState.isError && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-destructive rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-destructive font-medium">Ошибка отправки</h4>
                    <p className="text-destructive/80 text-sm">
                      {formState.errorMessage || 'Произошла ошибка при отправке заявки. Попробуйте еще раз.'}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormState(prev => ({ ...prev, isError: false, errorMessage: undefined }))}
                    className="text-destructive border-destructive/20 hover:bg-destructive/10"
                  >
                    Попробовать снова
                  </Button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className={`${isSmallScreen ? 'space-y-4' : 'space-y-6'}`}>
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Ваше имя *
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Введите ваше имя"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={cn(
                    errors.name && "border-destructive focus-visible:ring-destructive/20",
                    isTouch && "min-h-[44px] text-base"
                  )}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>



              {/* Phone Field */}
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Номер телефона *
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7-999-999-9999"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={cn(
                    errors.phone && "border-destructive focus-visible:ring-destructive/20",
                    isTouch && "min-h-[44px] text-base"
                  )}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="text-sm text-destructive">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Budget Field */}
              <div className="space-y-2">
                <label htmlFor="budget" className="text-sm font-medium text-foreground">
                  Бюджет
                </label>
                <Input
                  id="budget"
                  type="text"
                  placeholder="Например: 15 000 - 60 000 рублей"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className={cn(isTouch && "min-h-[44px] text-base")}
                />
              </div>

              {/* Requirements Field */}
              <div className="space-y-2">
                <label htmlFor="requirements" className="text-sm font-medium text-foreground">
                  Требования к ПК *
                </label>
                <Textarea
                  id="requirements"
                  placeholder="Опишите для каких задач нужен ПК: игры, работа, стриминг и т.д. Укажите желаемые характеристики или конкретные игры."
                  value={formData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  className={cn(
                    isTouch ? "min-h-[120px] text-base" : "min-h-[120px]",
                    errors.requirements && "border-destructive focus-visible:ring-destructive/20"
                  )}
                  aria-invalid={!!errors.requirements}
                  aria-describedby={errors.requirements ? "requirements-error" : undefined}
                />
                {errors.requirements && (
                  <p id="requirements-error" className="text-sm text-destructive">
                    {errors.requirements}
                  </p>
                )}
              </div>

              {/* Preferred Contact Method */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Предпочтительный способ связи
                </label>
                <div className="flex flex-wrap gap-4">
                  {[
                    { value: 'phone', label: 'Телефон' },
                    { value: 'telegram', label: 'Telegram' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContact"
                        value={option.value}
                        checked={formData.preferredContact === option.value}
                        onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                        className="w-4 h-4 text-primary bg-background border-border focus:ring-ring focus:ring-2"
                      />
                      <span className="text-sm text-foreground">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="gaming"
                size={isTouch ? "lg" : "default"}
                className={cn(
                  "w-full",
                  isTouch && "min-h-[44px] text-base py-3"
                )}
                disabled={formState.isSubmitting || formState.isSuccess}
              >
                {formState.isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Отправляем заявку...
                  </>
                ) : formState.isSuccess ? (
                  <>
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-2">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Заявка отправлена
                  </>
                ) : (
                  'Отправить заявку'
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Нажимая кнопку &ldquo;Отправить заявку&rdquo;, вы соглашаетесь на обработку персональных данных
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default ContactFormSection