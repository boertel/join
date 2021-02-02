import Head from 'next/head';
import {useEffect, useCallback, useState} from 'react';
import {useRouter} from 'next/router';

const Hg = props => <span {...props} />;
const Big = props => <b {...props} />;
const Comment = props => (
  <span {...props} style={{color: 'var(--grey)', lineHeight: '28px'}} />
);
const Optional = props => <span {...props} style={{display: 'none'}} />;

const A = props => <Hg className="text-a text-bold" {...props} />;
const B = props => <Hg className="text-b text-bold" {...props} />;

export default function Home() {
  const {query} = useRouter();

  const tableA = query.red || 'A';
  const tableB = query.blue || 'B';

  const queries = [
    {
      sql: (
        <>
          SELECT * FROM <A>{tableA}</A>{' '}
          <Big>
            LEFT <Optional>INNER</Optional> JOIN
          </Big>{' '}
          <B>{tableB}</B> ON <A>{tableA}</A>.value = <B>{tableB}</B>.value;
        </>
      ),
      circles: [true, true, false],
    },
    {
      sql: (
        <>
          SELECT * FROM <A>{tableA}</A>{' '}
          <Big>
            LEFT <Optional>INNER</Optional> JOIN
          </Big>{' '}
          <B>{tableB}</B> ON <A>{tableA}</A>.value = <B>{tableB}</B>.value{' '}
          <u>
            WHERE <B>{tableB}</B> IS NULL
          </u>
          ;
          <br />
          <Comment>-- or</Comment>
          <br />
          SELECT * FROM <A>{tableA}</A>{' '}
          <Big>
            LEFT <u>OUTER</u> JOIN
          </Big>{' '}
          <B>{tableB}</B> ON <A>{tableA}</A>.value = <B>{tableB}</B>.value;
        </>
      ),
      circles: [true, false, false],
    },

    {
      sql: (
        <>
          SELECT * FROM <A>{tableA}</A>{' '}
          <Big>
            FULL <Optional>OUTER</Optional> JOIN
          </Big>{' '}
          <B>{tableB}</B> ON <A>{tableA}</A>.value = <B>{tableB}</B>.value;
        </>
      ),
      circles: [true, true, true],
    },

    {
      sql: (
        <>
          SELECT * FROM <A>{tableA}</A>{' '}
          <Big>
            RIGHT <Optional>INNER</Optional> JOIN
          </Big>{' '}
          <B>{tableB}</B> ON <A>{tableA}</A>.value = <B>{tableB}</B>.value;
        </>
      ),
      circles: [false, true, true],
    },
    {
      sql: (
        <>
          SELECT * FROM <A>{tableA}</A>{' '}
          <Big>
            RIGHT <Optional>INNER</Optional> JOIN
          </Big>{' '}
          <B>{tableB}</B> ON <A>{tableA}</A>.value = <B>{tableB}</B>.value{' '}
          <u>
            WHERE <A>{tableA}</A>.value IS NULL
          </u>
          ;
          <br />
          <Comment>-- or</Comment>
          <br />
          SELECT * FROM <A>{tableA}</A> <Big>RIGHT OUTER JOIN</Big>{' '}
          <B>{tableB}</B> ON <A>{tableA}</A>.value = <B>{tableB}</B>.value;
        </>
      ),
      circles: [false, false, true],
    },
    {
      sql: (
        <>
          SELECT * FROM <A>{tableA}</A>{' '}
          <Big>
            FULL <Optional>OUTER</Optional> JOIN
          </Big>{' '}
          <B>{tableB}</B> ON <A>{tableA}</A>.value = <B>{tableB}</B>.value{' '}
          <u>
            WHERE <A>{tableA}</A>.value IS NULL OR <B>{tableB}</B>.value IS NULL
          </u>
          ;
        </>
      ),
      circles: [true, false, true],
    },
    {
      sql: (
        <>
          SELECT * FROM <A>{tableA}</A> <Big>INNER JOIN</Big> <B>{tableB}</B> ON{' '}
          <A>{tableA}</A>.value = <B>{tableB}</B>.value;
        </>
      ),
      circles: [false, true, false],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState();

  const select = index => () => {
    setCurrentIndex(index);
  };

  const current = queries[currentIndex];
  const circles = current?.circles || [false, false, false];

  const toggle = idx => {
    const update = [...circles];
    update[idx] = !circles[idx];
    const found = queries.findIndex(
      ({circles}) =>
        circles[0] === update[0] &&
        circles[1] === update[1] &&
        circles[2] === update[2],
    );
    setCurrentIndex(found);
  };

  const move = useCallback(
    evt => {
      switch (evt.key) {
        case 'ArrowDown':
        case 'j':
          setCurrentIndex(((isNaN(currentIndex) ? -1 : currentIndex) + 1) % 7);
          break;

        case 'ArrowUp':
        case 'k':
          const next = (isNaN(currentIndex) ? 7 : currentIndex) - 1;
          setCurrentIndex((next < 0 ? 6 : next) % 7);
          break;

        case '1':
          setCurrentIndex(0);
          break;

        case '2':
          setCurrentIndex(1);
          break;

        case '3':
          setCurrentIndex(2);
          break;

        case '4':
          setCurrentIndex(3);
          break;

        case '5':
          setCurrentIndex(4);
          break;

        case '6':
          setCurrentIndex(5);
          break;

        case '7':
          setCurrentIndex(6);
          break;

        case 'Escape':
          setCurrentIndex(null);
          break;
      }
    },
    [setCurrentIndex, currentIndex],
  );

  useEffect(() => {
    window.addEventListener('keydown', move);
    return () => window.removeEventListener('keydown', move);
  }, [move]);

  return (
    <>
      <h1 style={{textAlign: 'center'}}>
        If you can't beat 'em, <code>JOIN</code> 'em!
      </h1>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '40px',
        }}>
        <svg
          width="600"
          height="320"
          viewBox="0 0 700 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="cut">
              <rect x="285" y="0" width="140" height="400" />
            </clipPath>
            <mask id="eraser">
              <circle cx="488" cy="210" r={200 - 2} fill="#fff" />
            </mask>
          </defs>
          <circle
            cx="212"
            cy="210"
            r="200"
            fill="#EB5757"
            fillOpacity={circles[0] ? 0.7 : 0}
            stroke="#EB5757"
            strokeWidth="4"
            onClick={() => toggle(0)}
          />
          <text
            x="40"
            y="212"
            fill={circles[0] ? 'var(--bg)' : 'var(--red)'}
            dominantBaseline="middle"
            style={{fontSize: '36px', pointerEvents: 'none'}}>
            Table {tableA}
          </text>
          <circle
            cx="488"
            cy="210"
            r="200"
            fill="#2F80ED"
            fillOpacity={circles[2] ? 0.7 : 0}
            stroke="#2F80ED"
            strokeWidth="4"
            onClick={() => toggle(2)}
          />
          <text
            x="540"
            y="212"
            fill={circles[2] ? 'var(--bg)' : 'var(--blue)'}
            dominantBaseline="middle"
            style={{fontSize: '36px', pointerEvents: 'none'}}>
            Table {tableB}
          </text>
          <circle
            cx="212"
            cy="210"
            r={200 - 2}
            fill={circles[1] ? '#6781CD' : 'var(--bg)'}
            fillOpacity={circles[1] ? 1 : 1}
            clipPath="url(#cut)"
            mask="url(#eraser)"
            onClick={() => toggle(1)}
          />
        </svg>
      </div>
      <div
        style={{
          display: 'grid',
          marginTop: '40px',
        }}>
        {queries.map((query, index) => (
          <code
            className={index === currentIndex ? 'active' : null}
            key={index}
            onClick={select(index)}
            style={{
              padding: '18px',
              cursor: 'pointer',
              margin: '6px 0',
            }}>
            {query.sql}
          </code>
        ))}
      </div>
      <div
        style={{
          marginTop: '80px',
          textAlign: 'center',
          marginBottom: '40px',
          fontSize: '12px',
        }}>
        Built by{' '}
        <a href="https://ben.oertel.fr/" target="_blank">
          Benjamin Oertel
        </a>
      </div>
    </>
  );
}
