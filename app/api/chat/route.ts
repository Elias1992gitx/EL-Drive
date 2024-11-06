import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

if (!process.env.GOOGLE_API_KEY) {
  throw new Error('GOOGLE_API_KEY is not configured')
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    const contextualizedMessage = `
      Context: You are a digital workspace assistant specialized in helping users with file management and document processing. 
      Only answer questions related to:
      - File organization and management
      - Document signing and signatures
      - PDF editing and manipulation
      - Team collaboration and file sharing
      - Folder automation and organization
      - Document security and access control
      - File upload and storage
      If asked about unrelated topics, politely redirect to document and file management matters.

      User question: ${message}
    `

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const result = await model.generateContent(contextualizedMessage)
    const response = await result.response.text()

    if (!response) {
      return NextResponse.json(
        { error: 'Empty response from Gemini API' },
        { status: 500 }
      )
    }

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Gemini API error:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 500 }
    )
  }
}
