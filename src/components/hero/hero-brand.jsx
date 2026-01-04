const HeroBrand = () => {
  return (
    <div className="max-w-[660px] flex flex-col gap-[25px]">
        <h1 className="fs-1 font-semibold ">Karadutlu Dondurma</h1>

        <p>
        Karadutlu dondurma, karadut meyvesinin doğal tatlılığı ve hafif ekşimsi aromasıyla zenginleştirilmiş, ferahlatıcı bir lezzettir. Yaz aylarında serinlemek için mükemmel bir seçimdir.
        </p>

        <div className="flex gap-[40px]">
        <button className="hero-btn">Sipariş Et</button>
        <button className="hero-btn bg-white/15 border-0">Rezervasyon</button>
        </div>
    </div>
  )
}

export default HeroBrand