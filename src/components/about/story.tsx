import { Card, CardContent } from "../ui/card";
import Image from "next/image";
export const Story = () => {
  return (
    <div className="min-h-[600px] max-w-7xl mx-auto p-6">
      <Card className="w-full h-full shadow-none border-none">
        <CardContent className="p-0 w-full flex">
          <div className="flex w-full">
            {/* Left Image */}
            <div className="w-[25%] hidden lg:flex lg:h-full">
              <Image
                src="/about/footballer1.png"
                alt="Footballer"
                width={600}
                height={600}
                className=""
              />
            </div>

            {/* Center Content */}
            <div className="w-full h-full text-center flex flex-col justify-center lg:w-[50%] px-3 lg:px-4">
              <h1 className="text-3xl text-primary text-center">Story of one Shot</h1>
              <p className="font-normal text-center text-black text-sm py-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                ornare nunc eu felis eleifend porttitor. Praesent eu rutrum sem.
                Pellentesque rutrum ullamcorper viverra. Maecenas blandit
                facilisis odio, sit amet tincidunt nulla vehicula non. Nulla
                condimentum turpis nisl, ut bibendum ipsum blandit eu. Maecenas
                rutrum mattis massa vel sagittis. Duis placerat neque libero, ut
                rutrum sem posuere sed. Aliquam faucibus nibh vel porta auctor.
              </p>
              <p className="font-normal text-center text-black text-sm py-4">
                Maecenas dolor ipsum, varius vitae leo ut, ullamcorper finibus
                erat. Praesent rutrum lacus vel lectus efficitur consectetur.
                Etiam et odio at eros feugiat vehicula eu in erat. Etiam iaculis
                rhoncus neque. Curabitur quis justo metus. Nam sed posuere
                tellus. Pellentesque non nisi et libero luctus volutpat tempor
                vel quam. Vestibulum eu libero finibus diam vulputate volutpat.
                Mauris suscipit scelerisque massa, eu congue tellus pharetra et.
              </p>
              <p className="font-normal text-center text-black text-sm">
                Nam non congue metus. Quisque ullamcorper est urna, sit amet
                lobortis leo faucibus non. In eget tellus eu est imperdiet
                dictum.
              </p>
            </div>

            {/* Right Image */}
            <div className="w-[25%] hidden lg:flex lg:h-full">
              <Image
                src="/about/footballer2.png"
                alt="Footballer 2"
                width={600}
                height={600}
                className=""
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
