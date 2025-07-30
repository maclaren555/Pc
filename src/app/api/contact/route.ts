import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Here you would typically send an email or save to database
    console.log('Contact form submission:', body);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Сообщение отправлено успешно!' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Произошла ошибка при отправке сообщения' },
      { status: 500 }
    );
  }
}