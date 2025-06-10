export default function WarnAudioDefault(){
    return(
        <div className="w-full left-auto right-auto h-full bg-[red] fixed">
        <div className="w-1/2 h-full bg-[#ffffff] mx-auto my-auto flex flex-col items-center justify-around">
          <div className="h-[30%]  w-full flex flex-col justify-between items-center">
              <img width="146" height="146" src="https://img.icons8.com/external-tal-revivo-bold-tal-revivo/96/external-computer-error-alert-notification-with-alertness-warning-basic-bold-tal-revivo.png" alt="external-computer-error-alert-notification-with-alertness-warning-basic-bold-tal-revivo"/>
              <h2 className="text-[46px] font-bold">
                Внимание!
              </h2>
          </div>
          <p className="text-center text-[20px] md:text-[24px] font-medium text-[#2F3437] mt-6 px-4 max-w-[700px] mx-auto">
          Этот сайт создан, чтобы помочь тебе изменить свою жизнь к лучшему.  
          Тренируйся, следи за прогрессом, читай вдохновляющие блоги и достигай целей — 
          всё в одном месте. 
          </p>
          <div className="mt-8 flex flex-col items-center justify-center">
          <p className="text-[18px] mb-2 font-semibold text-[#2F3437]">💪 Вдохновляйся и действуй:</p>
          <audio controls className="w-[300px]">
            <source src="/Audio/Miside.m4a" type="audio/mpeg" />
            Ваш браузер не поддерживает аудио.
          </audio>
          </div>

        
            </div>
            </div>
    )
}